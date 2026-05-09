import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, company } = await req.json();

  if (!name || !email || !company) {
    return NextResponse.json(
      { error: "Campos obrigatórios faltando" },
      { status: 400 },
    );
  }

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "bryannascimentopl800@gmail.com",
      subject: `Novo lead no diagnóstico: ${name}`,
      html: `
        <h2>Novo lead no Diagnóstico FinanceiraMente</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Empresa:</strong> ${company}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao enviar email" },
      { status: 500 },
    );
  }
}
