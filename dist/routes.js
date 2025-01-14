"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const dotenv = __importStar(require("dotenv"));
const express_1 = require("express");
const nodemailer_1 = __importDefault(require("nodemailer"));
dotenv.config();
const router = (0, express_1.Router)();
exports.router = router;
const transporter = nodemailer_1.default.createTransport({
    // Inserir as configurações da Locaweb
    host: "smtp.mailersend.net",
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER_SMTP,
        pass: process.env.PASS_SMTP
    }
});
router.post("/submit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            if (error) {
                console.error(error);
            }
            else {
                console.log("E-mail enviado com sucesso!");
            }
        });
        res.send("Mensagem enviada com sucesso!");
    }
    catch (error) {
        console.log("Erro ao enviar o e-mail: " + error);
        res.status(500).json({ error: "Ocorreu um erro ao enviar o e-mail. Por favor, tente novamente mais tarde." });
    }
}));
