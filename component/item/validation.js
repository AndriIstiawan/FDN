
const Joi = require('joi');

//Register Validation
exports.create = data => {
    const schema = Joi.object({
        name: Joi.string().required()
    }).options({ allowUnknown: true });
    return schema.validate(data);
};
