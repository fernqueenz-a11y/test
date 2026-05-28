export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbyZzmL6v_Y-PZxf1kqiqALrI8S-b2guMWypKVne8vxe18lHNqauE63Q78pnLYwx4YkZ/exec',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(req.body)
      }
    );

    const text = await response.text();

    try {
      const data = JSON.parse(text);
      return res.status(200).json(data);
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: 'Apps Script ไม่ได้ตอบกลับเป็น JSON กรุณาเช็ค Deploy / สิทธิ์ Anyone',
        raw: text.substring(0, 200)
      });
    }

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}