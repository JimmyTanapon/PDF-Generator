import pdf from "pdfkit";
import fs from "fs";

let THSarabun = "./font/THSarabunNew.ttf";
let THSarabunBold = "./font/THSarabunNewBold.ttf";
const createPdf = () => {
  const doc = new pdf({
    size: "A4",
    margin: 40,
  });
  const employee = {
    name: "สมชาย ใจดี",
    employeeId: "12345",
    department: "ฝ่ายการเงิน",
    payDate: "30/09/2024",
    basicSalary: "20,0000",
    overtime: "2,000",
    bonus: "1,000",
    totalIncome: "23,000",
    tax: "500",
    socialSecurity: "750",
    otherDeductions: "250",
    netPay: "21,500",
  };
  doc
    .fillColor("red")
    .font(THSarabunBold)
    .fontSize(18)
    .text("CONFIDENTIAL", doc.page.margins.right, doc.y, {
      align: "right",
    });
  doc.image("./image/iRecruitlogo.png", doc.page.margins.right, doc.y, {
    width: 150,
  });

  doc.font(THSarabunBold).fontSize(18).fillColor("black");
  doc.text("ใบเเจ้งรายได้", doc.page.margins.left, doc.y, {
    align: "center",
  });
  doc.font(THSarabunBold).fontSize(14);

  doc.text(
    "บริษัท อินเทอร์เน็ตประเทศไทย จำกัด (มหาชน)",
    doc.page.margins.left,
    (doc.y += 60)
  );

  infomationSection(doc, employee, doc.x, (doc.y += 10));
  drawTable(doc, employee, 40, (doc.y += 30));

  totalSection(doc, doc.page.margins.right, doc.y);
  policyWarningSection(doc, doc.page.margins.right, (doc.y += 30));
  doc
    .font(THSarabun)
    .fontSize(14)
    .text(
      `เอกสารนี้จัดทำด้วยวิธีอิเล็กทรอนิกส์ หากมีข้อสงสัยสามารถติดต่อสอบถามเพิ่มเติมได้ที่ ฝ่ายทรัพยากรบุคล`,
      doc.x,
      doc.page.height - doc.page.margins.bottom * 2
    );
  // ปิดเอกสาร
  doc.end();

  // เขียนไฟล์ PDF ลงในระบบไฟล์
  doc.pipe(fs.createWriteStream("paySlip.pdf"));
};
// const drawTable = (doc, employee, startX, startY) => {
//   const columnWidth = 173;
//   const rowHeight = 60;
//   const lineHeight = 45;

//   const imagePath = "./image/iRecruitlogo.png";
//   const imageWidth = 350; // ความกว้างของรูปภาพ
//   const pageWidth = doc.page.width;
//   const pageHeight = doc.page.height;

//   // คำนวณตำแหน่ง X และ Y ให้รูปอยู่ตรงกลางทั้งแนวนอนและแนวตั้ง
//   const xPosition = (pageWidth - imageWidth) / 2;
//   const yPosition = (pageHeight - rowHeight * 4) / 2; // ปรับตามความสูงของตาราง

//   // วางรูปภาพที่ตำแหน่งคำนวณไว้ โดยไม่กำหนดความสูงให้เป็น auto
//   doc
//     .opacity(0.2)
//     .image(imagePath, xPosition, yPosition, {
//       width: imageWidth,
//       height: undefined,
//     });
//   doc.opacity(1); // รีเซ็ตค่า opacity
//   const headers = ["รายการเงินได้", "รายการเงินหัก", "รายการเงินสะสม"];
//   const data = [
//     {
//       title: "เงินเดือน",
//       value: employee.basicSalary,
//     },
//     {
//       title: "ค่าวิชาชีพ",
//       value: employee.basicSalary,
//     },
//     {
//       title: "รายได้อื่นๆ",
//       value: employee.basicSalary,
//     },
//     {
//       title: "รวมรายได้",
//       value: employee.basicSalary,
//     },
//   ];

//   doc.rect(startX, startY, columnWidth * 3, rowHeight);
//   // doc
//   // .moveTo(startX, startY)
//   // .lineTo(startX , startY)
//   // .stroke();
//   doc.font(THSarabunBold).fontSize(16).fillColor("#001aff");

//   headers.forEach((header, i) => {
//     doc.text(header, startX + i * columnWidth + 50, startY + 10, {
//       align: "left",
//     });

//   });

//   startY += rowHeight;

//   doc.font(THSarabun).fontSize(14);
//   data.forEach((row, rowIndex) => {
//     doc
//       .fillColor("black")
//       .text(row.title, startX + 10, startY + (rowIndex * lineHeight) / 2.5);

//     doc
//       .fillColor("black")
//       .text(row.value, startX + 120, startY + (rowIndex * lineHeight) / 2.5);
//   });

//   data.forEach((row, rowIndex) => {
//     doc
//       .fillColor("black")
//       .text(
//         row.title,
//         startX * 5.5 + 10,
//         startY + (rowIndex * lineHeight) / 2.5
//       );

//     doc
//       .fillColor("black")
//       .text(
//         row.value,
//         startX * 5.5 + 120,
//         startY + (rowIndex * lineHeight) / 2.5
//       );
//   });
//   data.forEach((row, rowIndex) => {
//     doc
//       .fillColor("black")
//       .text(
//         row.title,
//         startX * 9.9 + 10,
//         startY + (rowIndex * lineHeight) / 2.5
//       );

//     doc
//       .fillColor("black")
//       .text(
//         row.value,
//         startX * 9.9 + 120,
//         startY + (rowIndex * lineHeight) / 2.5
//       );
//   });

//   for (let i = 0; i < headers.length; i++) {
//     doc
//       .moveTo(startX + i * columnWidth, startY - rowHeight)
//       .lineTo(startX + i * columnWidth, startY + data.length * rowHeight)
//       .stroke();

//   }
//   doc
//     .rect(
//       startX,
//       startY - rowHeight,
//       columnWidth * 3,
//       (data.length + 1) * rowHeight
//     )
//     .stroke();
//   console.log("doc.y", doc.y);
//   console.log("StartY", startY);

//   doc.y += (rowHeight + startY  )/2;
// };
const drawTable = (doc, employee, startX, startY) => {
  const columnWidth = 173;
  const rowHeight = 60;
  const lineHeight = 45;

  const imagePath = "./image/iRecruitlogo.png";
  const imageWidth = 350; // ความกว้างของรูปภาพ
  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;

  // คำนวณตำแหน่ง X และ Y ให้รูปอยู่ตรงกลางทั้งแนวนอนและแนวตั้ง
  const xPosition = (pageWidth - imageWidth) / 2;
  const yPosition = (pageHeight - rowHeight * 4) / 2; // ปรับตามความสูงของตาราง

  doc.opacity(0.2).image(imagePath, xPosition, yPosition, {
    width: imageWidth,
    height: undefined,
  });
  doc.opacity(1); // รีเซ็ตค่า opacity

  const headers = ["รายการเงินได้", "รายการเงินหัก", "รายการเงินสะสม"];
  const data = [
    {
      title: "เงินเดือน",
      value: employee.basicSalary,
    },
    {
      title: "ค่าวิชาชีพ",
      value: employee.basicSalary,
    },
    {
      title: "รายได้อื่นๆ",
      value: employee.basicSalary,
    },
    {
      title: "รวมรายได้",
      value: employee.basicSalary,
    },
  ];

  doc.rect(startX, startY, columnWidth * 3, rowHeight);

  doc.font(THSarabunBold).fontSize(16).fillColor("#001aff");

  // วาดหัวตาราง
  headers.forEach((header, i) => {
    doc.text(header, startX + i * columnWidth + 50, startY + 10, {
      align: "left",
    });
  });

  doc
    .moveTo(startX, startY + 40) // ปรับตำแหน่ง Y ตามต้องการ
    .lineTo(startX + columnWidth * 3, startY + 40) // ตำแหน่งเส้นด้านล่างหัวตาราง
    .stroke();
  startY += rowHeight;

  doc.font(THSarabun).fontSize(14);
  data.forEach((row, rowIndex) => {
    doc
      .fillColor("black")
      .text(row.title, startX + 10, startY + (rowIndex * lineHeight) / 2.5);

    doc
      .fillColor("black")
      .text(row.value, startX + 120, startY + (rowIndex * lineHeight) / 2.5);
  });

  data.forEach((row, rowIndex) => {
    doc
      .fillColor("black")
      .text(
        row.title,
        startX * 5.5 + 10,
        startY + (rowIndex * lineHeight) / 2.5
      );

    doc
      .fillColor("black")
      .text(
        row.value,
        startX * 5.5 + 120,
        startY + (rowIndex * lineHeight) / 2.5
      );
  });
  data.forEach((row, rowIndex) => {
    doc
      .fillColor("black")
      .text(
        row.title,
        startX * 9.9 + 10,
        startY + (rowIndex * lineHeight) / 2.5
      );

    doc
      .fillColor("black")
      .text(
        row.value,
        startX * 9.9 + 120,
        startY + (rowIndex * lineHeight) / 2.5
      );
  });

  for (let i = 0; i < headers.length; i++) {
    doc
      .moveTo(startX + i * columnWidth, startY - rowHeight)
      .lineTo(startX + i * columnWidth, startY + data.length * rowHeight)
      .stroke();
  }

  doc
    .rect(
      startX,
      startY - rowHeight,
      columnWidth * 3,
      (data.length + 1) * rowHeight
    )
    .stroke();

  console.log("doc.y", doc.y);
  console.log("StartY", startY);

  doc.y += (rowHeight + startY) / 2;
};
const infomationSection = (doc, employee, startX, startY) => {
  let infomationX = startX;
  let infomationY = startY;

  const textLeft = [
    {
      title: "รหัสพนังงาน",
      value: 67866,
    },
    {
      title: "เเผนก",
      value: "ฝ่าย Tech Transformation",
    },
    {
      title: "งวดที่",
      value: "งวดจ่ายเงินเดือน",
    },
  ];
  const textRight = [
    {
      title: "ชื่อ-สกุล",
      value: employee.name,
    },
    {
      title: "ประจำเดือน",
      value: "สิงหาคม",
    },
    {
      title: "วันที่จ่าย",
      value: "30/09/2024",
    },
  ];

  textLeft.forEach((row, rowIndex) => {
    doc.font(THSarabunBold).fontSize(14);
    doc.text(row.title, infomationX, infomationY + rowIndex * 20, {
      lineBreak: false,
    });
    doc.font(THSarabun).fontSize(14);

    doc.text(row.value, infomationX + 70, infomationY + rowIndex * 20, {
      lineBreak: false,
    });
  });

  textRight.forEach((row, rowIndex) => {
    let rightX = infomationX * 8;
    doc.font(THSarabunBold).fontSize(14);

    doc.text(row.title, rightX, infomationY + rowIndex * 20, {
      lineBreak: false,
    });
    doc.font(THSarabun).fontSize(14);

    doc.text(row.value, rightX + 70, infomationY + rowIndex * 20, {
      lineBreak: false,
    });
  });
};
const totalSection = (doc, startX, startY) => {
  let totalSecX = startX;
  let totalSecY = startY;
  const inCome = [
    {
      title: "รวมเงินได้",
      value: "80000.00 บาท",
    },
    {
      title: "รวมเงินหัก",
      value: "80000.00 บาท",
    },
    {
      title: "รายได้สุทธิ",
      value: "80000.00 บาท",
    },
  ];
  inCome.forEach((row, index) => {
    doc.font(THSarabunBold).fontSize(14);
    doc.text(row.title, totalSecX + index * 180, totalSecY, {
      lineBreak: false,
    });
    doc.font(THSarabun).fontSize(14);

    doc.text(row.value, totalSecX + 100 + index * 180, totalSecY, {
      lineBreak: false,
    });
  });
};
const policyWarningSection = (doc, startX, startY) => {
  let policyWarningSecX = startX;
  let policyWarningSecY = startY;

  let policyText = [
    `***เงินเดือนของท่าน ถือเป็นความลับ***`,
    `ห้ามเผยเเพร่หรือเปิดเผยให้พนักงานท่านอื่นทราบ`,
    `หากการกระทำดังกล่าว ส่งผลกระทบกับบริษัท จะมีบทลงโทษตามระเบียบของบริษัท ทันที`,
  ];
  policyText.forEach((text, index) => {
    doc
      .font(THSarabun)
      .fontSize(14)
      .text(text, policyWarningSecX, policyWarningSecY + index * 20);
  });
};

const CreatePdf2 = () => {
  const doc = new pdf({
    size: "A4",
    margin: 45,
  });
  let docX = doc.x;
  let docY = doc.y;
  doc.image("./image/iRecruitlogo.png", doc.page.margins.right, doc.y, {
    width: 100,
  });

  doc.font(THSarabun).fontSize(14);

  doc.text("ที่ IRECRUIT HR-Cert 1617/2567", docX, docY + 60);

  doc.text("หนังสือรับรอง", doc.page.margins.left, doc.y, {
    align: "center",
  });

  doc.end();

  doc.pipe(fs.createWriteStream("cert.pdf"));
};
//createPdf();
//CreatePdf2();

function generatePDF() {
  const emp = {
    name: `Mr.Meowline lineThaiff`,
    company: `Internet Thailand Public Co. LTD`,
    mount: `August 1st, 2024`,
    saraly: 21000,
    position: "Software Engineer, Tech Transfiormation Department",
    date: "September 29th",
  };
  const doc = new pdf({
    size: "A4",
    margins: {
      top: 20,
      left: 45,
      right: 45,
      bottom: 20,
    },
  });
  const Textline = {
    firstline: {
      start: `This letter is to confirm that`,
      end: `has been employed`,
      value: emp.name,
    },
    secondline: {
      start: `by`,
      end: `since`,
      value: emp.company,
    },
    thirdline: {
      start: `and earns a gross monthly income at THB `,
      value: emp.saraly,
    },
    fourthline: {
      start: `His current position is`,
      end: `.`,
      value: emp.position,
    },
    firfthline: {
      start: `I hereby certify that the above statement is true and correct as issued on`,
      end: `.`,
      value: emp.date,
    },
  };

  let docX = doc.x;
  let docY = doc.y;
  const lineHeight = 22;
  let fontSize = 14;

  doc.image(
    "./image/header.png",
    doc.page.margins.right - 45,
    doc.page.margins.top - 20,
    {
      width: 600,
    }
  );
  doc.moveDown(3);
  doc.image("./image/iRecruitlogo.png", doc.page.margins.right, doc.y, {
    width: 100,
  });
  doc.font(THSarabun).fontSize(fontSize);
  doc.moveDown(5);
  doc.text("INET HR-Cert. 1617/2024");
  doc.moveDown(0.5);
  doc.text("TO WHOM IT MAY CONCERN");
  doc.moveDown(0.5);

  function addDots(doc, startText, endText, value, pageWidth) {
    const startTextWidth = doc.widthOfString(startText);
    const endTextWidth = endText ? doc.widthOfString(endText) : 0;
    const dotsWidth = doc.widthOfString(".");

    // คำนวณพื้นที่ว่างที่เหลือ
    const availableSpace = pageWidth - (startTextWidth + endTextWidth);

    // จำนวนจุดที่ต้องแทรก
    const numDots = Math.floor(availableSpace / dotsWidth);
    const dots = ".".repeat(numDots);

    // คำนวณตำแหน่งที่จะแสดง value ให้อยู่ตรงกลางของจุด
    const totalDotsWidth = numDots * dotsWidth;
    const centerOfDotsX =
      startTextWidth + (availableSpace - totalDotsWidth) / 2;

    if (endText) {
      // ถ้ามี endText ให้แสดงผลในบรรทัดเดียว
      const textToShow = startText + dots + endText;
      doc.text(textToShow, doc.page.margins.left);

      // แสดงค่า value ให้อยู่ตรงกลางของจุด
      const valueX =
        centerOfDotsX + (totalDotsWidth - doc.widthOfString(value)) / 2; // คำนวณตำแหน่ง X ของ value
      doc.text(value, doc.x + valueX, doc.y - lineHeight); // วาง value ตรงกลางจุด
    } else {
      // ถ้าไม่มี endText ให้แสดงจุดสองบรรทัดเต็ม
      doc.text(startText + dots);
      const valueX =
        centerOfDotsX +
        (totalDotsWidth - doc.widthOfString(value.toString())) / 2; // คำนวณตำแหน่ง X ของ value
      doc.text(value, doc.x + valueX, doc.y - lineHeight);

      // คำนวณจุดเต็มบรรทัดที่สอง
      const fullLineDots = ".".repeat(Math.floor(pageWidth / dotsWidth));
      doc.moveDown(0.3);
      doc.x = doc.page.margins.left;
      doc.text(fullLineDots); // เพิ่มจุดเต็มบรรทัดใหม่
    }
    doc.moveDown(0.3);
    doc.x = doc.page.margins.left;
  }

  function midSpecDots(doc, startText, endText, value, pageWidth) {
    const startTextWidth = doc.widthOfString(startText);
    const endTextWidth = doc.widthOfString(endText);
    const dotsWidth = doc.widthOfString(".");
    const availableSpace = pageWidth - (startTextWidth + endTextWidth);

    const findSpaceOfStartText = (availableSpace * 60) / 100;
    const findSpaceOfEndText = availableSpace - findSpaceOfStartText;

    const numStartDots = Math.floor(findSpaceOfStartText / dotsWidth);
    const numEndDots2 = Math.floor(findSpaceOfEndText / dotsWidth);

    const dots1 = ".".repeat(numStartDots);
    const dots2 = ".".repeat(numEndDots2);

    doc.text(startText + dots1 + endText + dots2);

    const startWidth = doc.x + doc.widthOfString(startText + dots1 + endText);
    const endWidth =
      doc.x + doc.widthOfString(startText + dots1 + endText + dots2);
    const totalWidth =
      (startWidth + endWidth) / 2 - doc.widthOfString(emp.mount) / 2;

    const totalStartDotsWidth = numStartDots * dotsWidth;
    const centerStartOfDotsX =
      startTextWidth + (findSpaceOfStartText - totalStartDotsWidth) / 2;
    const valueX =
      centerStartOfDotsX +
      (totalStartDotsWidth - doc.widthOfString(value.toString())) / 2;
    doc.text(value, doc.x + valueX, doc.y - lineHeight);

    doc.text(emp.mount, totalWidth, doc.y - (lineHeight - 4));

    doc.x = doc.page.margins.left;
    doc.moveDown(0.3);
  }
  function signatureSection() {
    doc.text("Yours faithfully", { align: "left" });
    doc.image("./image/iRecruitlogo.png", doc.x + 200, doc.y, {
      width: 100,
    });
    doc.moveDown(3);
    doc.text("(Ms. Hunsa Nawarapun)", { align: "left" });

    doc.text("Senior Vice President", { align: "left" });
    doc.moveDown(3);

    doc.text("Human Resources Division", { align: "left" });
    doc.text("Tel. 0-2257-7000", { align: "left" });
    doc.moveDown(3);
  }
  function footerSection (){
    doc.text("www.inet.co.th", { align: "left" });
    doc.font(THSarabun).fontSize(fontSize);
    doc.text(
      "บริษัท อินเทอร์เน็ตประเทศไทย จำกัด (มหาชน) สำนักงานใหญ่ เลขประจำตัวผู้เสียภาษี 0107544000094",
      { align: "left" }
    );
    doc.text(
      "1768 อาคารไทยซัมมิท ทาวเวอร์ ชั้น 10-12 และชั้น IT ถ.เพชรบุรีตัดใหม่ แขวงบางกะปิ เขตห้วยขวาง กรุงเทพมหานคร 10310",
      { align: "left" }
    );
    doc.text("Tel: (662) 257-7000 Fax: (662) 257-7222", { align: "left" });
  
    doc.text("Internet Thailand Public Company Limited", { align: "left" });
    doc.text(
      "1768 Thai Summit Tower, 10-12 Floor and IT Floor, New Petchaburi Road, Bangkok 10310",
      { align: "left" }
    );
    doc.text("Tel: (662) 257-7000 Fax: (662) 257-7222", { align: "left" });
   }

  const pageWidth =
    doc.page.width - doc.page.margins.left - doc.page.margins.right;

  addDots(
    doc,
    Textline.firstline.start,
    Textline.firstline.end,
    Textline.firstline.value,
    pageWidth
  );
  midSpecDots(
    doc,
    Textline.secondline.start,
    Textline.secondline.end,
    Textline.secondline.value,
    pageWidth
  );
  addDots(
    doc,
    Textline.thirdline.start,
    Textline.thirdline.end,
    Textline.thirdline.value,
    pageWidth
  );
  addDots(
    doc,
    Textline.fourthline.start,
    Textline.fourthline.end,
    Textline.fourthline.value,
    pageWidth
  );
  doc.moveDown(1);
  addDots(
    doc,
    Textline.firfthline.start,
    Textline.firfthline.end,
    Textline.firfthline.value,
    pageWidth
  );
  doc.moveDown(2);
  doc.x = doc.page.margins.left;
  // Signature section
  signatureSection();
   // Footer with company information
  footerSection();



  // Finalize the PDF and end the stream
  doc.end();

  doc.pipe(fs.createWriteStream("cert2.pdf"));
}
// Generate the PDF
generatePDF();
