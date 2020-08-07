module.exports={

    sendForgotPasswordDesign(){
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>: A2ZWORK :</title>
        </head>
        <body>
            <div class="welcome-page-container" style="display: flex; flex-direction: column; justify-content: center; align-items: center">
                <div class="welcome-page-card" style="width: 500px; background:#4d4f53;  box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
            color : azure; padding: 30px">
                    <h1 style="text-align: center;">A2ZWORK</h1>
                    <h3 style="text-align: center;">We received a request to change your password</h3>
                    <h5>Hi, Souvik,</h5>
                    <p>We at A2ZWORK take the trust and safety of our users seriously. Use the link below to set up a new password for your account.</p>
                    <div class="verify-container" style="text-align: center">
                        <button class="verify-button" style="width: 300px ; padding: 10px; background: #fff200; outline: none;
            border-radius: 8px; cursor: pointer;" value="">Change password</button>
                    </div>
                    <p>Thanks for your time,</p>
                    <p><b>The A2ZWORK Team</b></p>
                    <p>If you have any issues confirming your email, we will be happy to help you. You can contact us on <b>rajakabhijeet6@gmail.com</b>.</p>
                </div>
            </div>
        </body>
        </html>`
    }
}