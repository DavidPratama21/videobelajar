import { sendMail } from "../../services/email.service.js";

export const sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).send({ message: "Diisi dulu mas emailnya" });
  }

  try {
    await sendMail(to, subject, text);
    res.status(200).json({ message: "Email berhasil dikirim" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const subscribeEmail = async (req, res) => {
  const { to } = req.body;

  if (!to) return res.status(400).send({ message: "Diisi dulu mas emailnya" });

  try {
    await sendMail(
      to,
      "Selamat!!! Kamu udah berlangganan 🎉",
      "Terima kasih sudah subscribe di hariesok.id. Nantikan info terbaru dan penawaran spesial dari kami 🚀"
    );
    res.status(200).json({ message: "Email berhasil dikirim" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
