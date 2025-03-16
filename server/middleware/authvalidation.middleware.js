import validator from "validatorjs";

const registerValidation = async(req, res, next) => {
    const validateRule = {
        username: "required|string|min:3",
        email: "required|email",
        password: "required|string|min:8",
    };

   const validation = new validator(req.body, validateRule);
   if (validation.fails()) {
    return res.status(411).json({
        message: "Validation failed",
        data: validation.errors,
    });
   }
   next();
};

const loginValidation = async(req, res, next) => {
    const validateRule = {
        email: "required|email",
        password: "required|string|min:8",
    };
    
    const validation = new validator(req.body, validateRule);
    if (validation.fails()) {
    return res.status(411).json({
        message: "Validation failed",
        data: validation.errors,
    });
   }
   next();
};

export { registerValidation, loginValidation };

