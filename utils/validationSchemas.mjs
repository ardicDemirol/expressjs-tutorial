export const createUserValidationSchema = {
    username: {
        isLength: {  
            options: {
                min: 3,
                max: 32
            },
            errorMessage: "Username must be between 5 and 32 characters"
        },
        notEmpty: {
            errorMessage: "Username cannot be empty"
        },
        isString: { 
            errorMessage: "Username must be a string"
        },
    },
    age: {
        isInt: { 
            options: {
                min: 0,
                max: 99
            },
            errorMessage: "Age must be an integer between 0 and 99"
        },
        notEmpty: {
            errorMessage: "Age must not be empty"
        },
    },
    password: {
        isLength: { 
            options: {
                min: 6,
                max: 16
            },
            errorMessage: "Password must be between 6 and 16 characters"
        },
        notEmpty: {
            errorMessage: "Password must not be empty"
        },
        isString: {
            errorMessage: "Password must be a string"
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