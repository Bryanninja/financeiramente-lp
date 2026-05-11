import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, phase, score, pilarScores } = await req.json();

  const phaseNames: Record<number, string> = {
    1: "Negócio no Escuro",
    2: "Consciência Financeira",
    3: "Estrutura Financeira",
    4: "Inteligência Financeira",
  };

  const pillarLabels = [
    "Rentabilidade",
    "Resultado",
    "Caixa",
    "Retorno sobre investimento",
  ];

  try {
    await resend.emails.send({
      from: "FinanceiraMente <onboarding@resend.dev>", // Lembre de mudar depois
      to: [email],
      subject: "Seu Relatório de Maturidade Financeira — FinanceiraMente",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #FAF9F6; font-family: Arial, sans-serif; color: #121212;">
          
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FAF9F6; padding: 40px 20px;">
            <tr>
              <td align="center">
                
                <table width="100%" max-width="600px" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); max-width: 600px; border: 1px solid #E3E2DE;">
                  
                  <tr>
                    <td align="center" style="background-color: #121212; padding: 40px 20px; border-radius: 12px 12px 0 0;">
                      <img src="https://i.imgur.com/PPCHvoK.png" alt="FinanceiraMente" style="max-width: 200px; display: block;" />
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 40px 30px;">
                      <h1 style="font-size: 24px; font-weight: bold; margin: 0 0 20px 0; color: #121212;">Olá, ${name}!</h1>
                      <p style="font-size: 16px; line-height: 1.6; margin: 0 0 30px 0; color: #4A4A4A;">
                        Aqui está o resumo oficial do seu Relatório de Maturidade Financeira. Use essas informações para entender o seu cenário atual e tomar as rédeas do seu negócio.
                      </p>

                      <div style="background-color: #F8FAFC; border-left: 4px solid #1E3A8A; padding: 20px; border-radius: 4px; margin-bottom: 30px;">
                        <p style="margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #64748B;">Seu Perfil Atual</p>
                        <h2 style="margin: 0 0 10px 0; font-size: 22px; color: #1E3A8A;">Fase: ${phaseNames[phase] ?? "—"}</h2>
                        <p style="margin: 0; font-size: 16px; font-weight: bold; color: #121212;">Pontuação total: <span style="color: #1E3A8A;">${score}/48 pontos</span></p>
                      </div>

                      <h3 style="font-size: 18px; margin: 0 0 15px 0; color: #121212;">Avaliação dos Pilares:</h3>
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                        ${pillarLabels
                          .map(
                            (label, i) => `
                          <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #E3E2DE; font-size: 15px; color: #4A4A4A;">
                              <strong>${label}</strong>
                            </td>
                            <td align="right" style="padding: 12px 0; border-bottom: 1px solid #E3E2DE; font-size: 15px; font-weight: bold; color: #121212;">
                              ${pilarScores[i] ?? 0}/12
                            </td>
                          </tr>
                        `,
                          )
                          .join("")}
                      </table>

                      <p style="font-size: 16px; line-height: 1.6; margin: 0 0 30px 0; color: #4A4A4A;">
                        Para aprofundar a análise do seu negócio e traçar os próximos passos, agende sua Sessão Estratégica gratuita com o Michel.
                      </p>

                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center">
                            <a href="https://wa.me/5511981110009?text=Ol%C3%A1%20Michel%21%20Quero%20agendar%20minha%20Sess%C3%A3o%20Estrat%C3%A9gica%20FinanceiraMente%20gratuita." style="display: inline-block; padding: 16px 32px; background-color: #1E3A8A; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; text-align: center;">
                              Agendar Sessão Estratégica
                            </a>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>

                  <tr>
                    <td align="center" style="background-color: #F1F1F1; padding: 20px; border-radius: 0 0 12px 12px;">
                      <p style="margin: 0; font-size: 12px; color: #888888;">
                        © FinanceiraMente. Todos os direitos reservados.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erro ao enviar email" },
      { status: 500 },
    );
  }
}
