function verifySignup(req, res, next) {
    try {
        const { name, userId, email, password } = req.body;

        if (!name || !userId || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const isValidEmail = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if (!isValidEmail) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email"
            })
        }

        next()

    } catch (error) {
        console.log("Error While validating the request body", error);

        return res.status(400).json({
            success: false,
            message: "Error While validating the request body"
        })
    }
}

function verifySignin(req, res, next) {
    try {
        const { userId, password } = req.body;

        if (!userId || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        next()

    } catch (error) {
        console.log("Error While validating the request body");

        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export {
    verifySignup,
    verifySignin
}