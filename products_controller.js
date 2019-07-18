module.exports = {
  create: (req, res) => {
    const { name, description, price, image_url } = req.body;

    const db = req.app.get("db");
    db.create_product(name, description, price, image_url)
      .then(() => {
        res.sendStatus(200);
      })
      .catch(() => {
        res.status(500).send("Couldn't create product.");
      });
  },

  getOne: (req, res) => {
    const { id } = req.params;
    const db = req.app.get("db");
    db.read_product(id)
      .then(product => {
        res.status(200).send(product);
      })
      .catch(e => {
        res.status(500).send("Couldn't find product.");
        console.log(e);
      });
  },

  getAll: (req, res) => {
    const db = req.app.get("db");
    db.read_products()
      .then(products => {
        res.status(200).send(products);
      })
      .catch(e => {
        res.status(500).send("Couldn't get all products.");
        console.log(e);
      });
  },

  update: (req, res) => {
    const { id } = req.params;
    const { desc } = req.query;
    const db = req.app.get("db");
    db.update_product(id, desc)
      .then(() => {
        res.sendStatus(200);
      })
      .catch(() => {
        res.status(500).send("Couldn't update product.");
      });
  },

  delete: (req, res) => {
    const { id } = req.params;
    const db = req.app.get("db");
    db.delete_product(id)
      .then(() => {
        res.sendStatus(200);
      })
      .catch(() => {
        res.status(500).send("Couldn't delete product.");
      });
  }
};
