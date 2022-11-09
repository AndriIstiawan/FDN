
const Joi = require('joi');

//Register Validation
exports.register = data => {
    const schema = Joi.object({
        username: Joi.string().required().min(5),
        password: Joi.string().required().min(6),
    }).options({ allowUnknown: true });
    return schema.validate(data);
};
