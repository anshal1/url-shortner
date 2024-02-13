const paginate = (schema) => {
  schema.statics.paginate = async function (filter, options) {
    try {
      let nextPage = false;
      let query = this.find(filter)
        .sort(options.sort)
        .limit(+options?.limit)
        .skip(+options?.limit * (+options?.page - 1));

      if (options.populate && Array.isArray(options.populate)) {
        options.populate.forEach((path) => {
          query = query.populate(path);
        });
      }

      const docs = await query.exec();
      if (docs.length < +options?.limit) {
        nextPage = false;
      } else if (docs?.length === +options?.limit) {
        const checknextPage = await this.findOne(filter)
          .limit(1)
          .skip(+options?.limit * +options?.page);
        if (checknextPage) {
          nextPage = true;
        } else {
          nextPage = false;
        }
      }

      return {
        results: docs,
        nextPage,
      };
    } catch (error) {
      throw new Error(`Error fetching and sorting documents: ${error}`);
    }
  };
};

module.exports = paginate;

module.exports = paginate;
