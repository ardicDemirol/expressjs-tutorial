export const createUserValidationSchema = {
    username: {
        isLenght: {
            options: {
                min:5,
                max:32
            },
            errorMessage:"Username must be at least 5 characters with a max of 20 characters"
        },
        notEmpty: {
            errorMessage: "Username cannot be empty"
        },
        isString: {
            errorMessage: "Username must be string"
        },
    },
    age:{
        isInt:{
            options:{
                min:0,
                max:99
            },
            errorMessage:"age must be in 0-99 range"
        },
        notEmpty: {
            errorMessage: "age must not be empty"
        },
        isEAN:{
            errorMessage:"age must not be null"
        }
    }
};

export const getUserValidationSchema = {
    filter:{
        isString: {
            errorMessage: "Filter must not be empty"
        },
        notEmpty: {
            errorMessage: "Filter must not be empty"
        },
        isLenght: {
            options:{
                min:3,
                max:15
            },
            errorMessage:"Must be at lest 3-10 characters"
        }
    }
};