import * as dotenv from "dotenv";
import { Request, Response, Router } from "express";

import nodemailer from "nodemailer";

dotenv.config();

const router = Router();

const transporter = nodemailer.createTransport({
    // Inserir as configurações da Locaweb
    host: "smtp.mailersend.net",
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER_SMTP,
        pass: process.env.PASS_SMTP
    }
});

router.post("/submit", async (req: Request, res: Response) => {
    const { name, dateOfBirth, phone, gender, email, allowPolicie } = req.body;

    // procurar validações para segurança

    try {
        transporter.sendMail({
            from: "naoresponda.brinovar@trial-3vz9dleom27gkj50.mlsender.net",
            to: email,
            subject: "Novo contato - Garantia Estendida",
            text: `Nome do body: ${name} e email: ${email}`,
            html: `
                <p>
                    <span style='font-weight:bold'>Nome:</span> ${name}<br>
                    <span style='font-weight:bold'>Data de nascimento:</span> ${dateOfBirth}<br>
                    <span style='font-weight:bold'>Telefone:</span> ${phone}<br>
                    <span style='font-weight:bold'>Sexo:</span> ${gender}<br>
                    <span style='font-weight:bold'>E-mail:</span> ${email}<br>
                    <span style='font-weight:bold'>Concordou com os termos:</span> ${allowPolicie}
                </p>
            `
        }, (error, info) => {
            if(error) {
                console.error(error);
            } else {
                console.log("E-mail enviado com sucesso!");
            }
        });
        
        res.send("Mensagem enviada com sucesso!");
    } catch (error) {
        console.log("Erro ao enviar o e-mail: " + error);
        res.status(500).json({ error: "Ocorreu um erro ao enviar o e-mail. Por favor, tente novamente mais tarde." })
    }
})

export { router };