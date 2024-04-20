export const update_name_validation = {
    name: 'name',
    label: 'Name',
    type: 'text',
    id: 'name',
    placeholder: 'Enter your good name',
    validation: {
        maxLength: {
            value: 30,
            message: '30 characters max',
        },
    },
}

export const update_username_validation = {
    name: 'userName',
    label: 'Username',
    type: 'text',
    id: 'username',
    placeholder: 'Enter your username',
    validation: {
        minLength: {
            value: 5,
            message: 'Username must be at least 5 characters.',
        },
        maxLength: {
            value: 20,
            message: '20 characters max',
        },
        pattern: {
            value: /^[a-zA-Z0-9_]+$/,
            message: 'Username must contain only letters, numbers & underscore'
        }
    },
}

export const update_password_validation = {
    name: 'password',
    label: 'Password',
    type: 'password',
    id: 'password',
    placeholder: 'Enter your password',
    validation: {
        minLength: {
            value: 7,
            message: 'Password must be at least 7 characters.',
        },
    },
}

export const update_email_validation = {
    name: 'email',
    label: 'Email',
    type: 'email',
    id: 'email',
    placeholder: 'Enter your email',
    validation: {
        pattern: {
            value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'Invalid email',
        },
    },
}
