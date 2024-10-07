const { body, validationResult } = require("express-validator");

app.post(
  "/tasks",
  [
    body("title").notEmpty().withMessage("Le titre est requis"),
    body("completed")
      .isBoolean()
      .withMessage("La valeur doit être true ou false"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const task = await Task.create(req.body);
    res.status(201).json(task);
  }
);
