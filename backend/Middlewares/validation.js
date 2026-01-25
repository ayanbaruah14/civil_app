

export const signupValidation = (req, res, next) => {
  const errors = {};

  const {
    name,
    email,
    password,
    role,
    engineer_type,
    max_degree,
    experience,
  } = req.body;

  // name
  if (!name || name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  // email
  if (!email) {
    errors.email = "Email is required";
  } else if (!email.includes("@") || !email.includes(".")) {
    errors.email = "Email must contain @ and .";
  }

  // password
  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 4) {
    errors.password = "Password must be at least 4 characters";
  }

  // role
  if (!role) {
    errors.role = "Role is required";
  }

  // engineer-specific validation
  if (role === "ENGINEER") {
    if (!engineer_type) {
      errors.engineer_type = "Engineer type is required";
    }

    if (!max_degree) {
      errors.max_degree = "Maximum degree is required";
    }

    if (experience === undefined || experience === "") {
      errors.experience = "Experience is required";
    } else if (Number(experience) < 0) {
      errors.experience = "Experience cannot be negative";
    }
  }

  // if any error exists
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};






export const loginValidation = (req, res, next) => {
  const errors = {};
  const { email, password } = req.body;

  // email
  if (!email) {
    errors.email = "Email is required";
  } else if (!email.includes("@") || !email.includes(".")) {
    errors.email = "Email must contain @ and .";
  }

  // password
  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 4) {
    errors.password = "Password must be at least 4 characters";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};



