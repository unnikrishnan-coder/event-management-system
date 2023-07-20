const resendMailer = require('resend')

const resend = new resendMailer.Resend('re_Rau9p61Q_H6BGkwmhj5gTYbsrzo3beznr');

async function mailer(subject,body,recievers){
    if(recievers.length==1){
        try {
            const data = await resend.emails.send({
            from: 'festy@resend.dev',
            to: recievers[0],
            subject: subject,
            html: body
            });
            const status = 200;
            return {status,data}
        } catch (error) {
            return {status:400,data:err}
        }
    }else{
        try {
            console.log(recievers);
            const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: recievers,
            subject: subject,
            html: body
            });
            const status = 200;
            return {status,data}
        } catch (error) {
            return {status:400,data:error}
        }
    }

}

module.exports = mailer