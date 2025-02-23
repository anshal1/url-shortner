const urlModel = require("../modles/urlData.model");
const TryCatch = require("../utils/TryCatch");
const ApiError = require("../utils/ApiError");
const status = require("http-status");

const GenrerateShortUrlId = () => {
  const letters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const date = Date.now().toString();
  return new Promise((resolve) => {
    let id = "";
    for (let i = 0; i < date.length; i++) {
      const randnum = (+date[i] * letters.length) % (letters.length - 1);
      if (randnum % 2 === 0) {
        id += letters[randnum].toUpperCase();
      } else {
        id += letters[randnum];
      }
    }
    resolve(id);
  });
};

const isUrl = (url) => {
  const regex = new RegExp("^(https)|(http)|(ftp)");
  return regex.test(url);
};

const CreateNewShortUrl = TryCatch(async (req, res) => {
  const user = req.user;
  const { long_url } = req.body;
  if (!long_url) {
    throw new ApiError("Url is required", status.BAD_REQUEST);
  }
  if (!isUrl(long_url)) {
    throw new ApiError("Invalid url", status.BAD_REQUEST);
  }
  const url_id = await GenrerateShortUrlId();
  const protocol = req.protocol;
  const host = req.hostname;
  let shortUrl = "";
  if (process.env.env === "PRODUCTION") {
    shortUrl = `${protocol}://${host}/url/short/${url_id}`;
  } else {
    //   for dev only
    const PORT = process.env.PORT || 5000;
    shortUrl = `${protocol}://${host}:${PORT}/url/short/${url_id}`;
  }
  const createUrl = await urlModel.create({
    user: user?._id,
    short_url: shortUrl,
    long_url,
    short_url_id: url_id,
  });
  if (!createUrl) {
    throw new ApiError(
      "Unable to create short url try again",
      status.INTERNAL_SERVER_ERROR
    );
  }
  res.json({ url: createUrl });
});

const navigateToUrlFromShortUrl = TryCatch(async (req, res) => {
  const { short_url_id } = req.params;
  const url = await urlModel.findOne({ short_url_id });
  if (!url) {
    throw new ApiError("Url not found", status.NOT_FOUND);
  }
  res.redirect(302, url?.long_url);
  await urlModel.findOneAndUpdate(
    { short_url_id },
    { $set: { clicks: url.clicks + 1 } },
    { new: true }
  );
});

const getPaginatedUrl = TryCatch(async (req, res) => {
  const user = req.user;
  const { page = 1, limit = 15 } = req.query;
  const filter = { user: user?._id };
  const option = {
    page: +page,
    limit: +limit,
    sort: {
      createdAt: -1,
    },
    populate: [{ path: "user", select: "name" }],
  };
  const urls = await urlModel.paginate(filter, option);
  res.json({ urls });
});

module.exports = {
  CreateNewShortUrl,
  navigateToUrlFromShortUrl,
  getPaginatedUrl,
};
