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
  doc.image('./image/iRecruitlogo.png',doc.page.margins.right, doc.y, {width:150})

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

  // วางรูปภาพที่ตำแหน่งคำนวณไว้ โดยไม่กำหนดความสูงให้เป็น auto
  doc
    .opacity(0.2)
    .image(imagePath, xPosition, yPosition, {
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
const companyLogoImage = (doc) =>{
  const imagePath = "./image/iRecruitlogo.png";

}
const CreatePdf2 = ()=>{
  const doc = new pdf({
    size: "A4",
    margin: 40,
  });

  doc.end();

  doc.pipe(fs.createWriteStream("cert.pdf"));

}
createPdf();
// CreatePdf2()
