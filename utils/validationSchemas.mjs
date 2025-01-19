export const createUserValidationSchema = {
    username: {
        isLength: {  // "isLength" olmalı
            options: {
                min: 5,
                max: 32
            },
            errorMessage: "Username must be at least 5 characters with a max of 32 characters"  // 32 karakter olmalı
        },
        notEmpty: {
            errorMessage: "Username cannot be empty"
        },
        isString: {  // Eğer string kontrolü yapmak isterseniz kullanılabilir
            errorMessage: "Username must be a string"
        },
    },
    age: {
        isInt: {  // "isInt" zaten yaş için doğru bir validasyon
            options: {
                min: 0,
                max: 99
            },
            errorMessage: "Age must be in 0-99 range"
        },
        notEmpty: {
            errorMessage: "Age must not be empty"
        },
        isInt: {  // "isEAN" yerine "isInt" kullanılmalı
            errorMessage: "Age must be an integer"
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