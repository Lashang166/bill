const faker = require("faker");
const moment = require("moment");

for (let i = 0; i < 10; i++) {
  const itemCount = faker.random.number({ min: 1, max: 5 });
  let Data = {
    ShipTypes: [
      {
        id: 1,
        description: "EMS",
        rate: 30
      },
      {
        id: 2,
        description: "Kerry Express",
        rate: 100
      }
    ],
    BankAccounts: [
      {
        id: 1,
        BankName: faker.company.companyName(),
        BankAccNo: faker.finance.account(),
        BankBranch: faker.address.country()
      },
      {
        id: 2,
        BankName: faker.company.companyName(),
        BankAccNo: faker.finance.account(),
        BankBranch: faker.address.country()
      }
    ],
    items: []
  };
  // console.log(itemCount);
  for (let i = 0; i < itemCount; i++) {
    const product = faker.commerce.product();
    Data.items.push({
      SKU: faker.random.alphaNumeric(8).toUpperCase(),
      Description: `${product}`,
      UnitName: `ชิ้น`,
      PricePerUnit: faker.random.number({ min: 100, max: 1000 }),
      Amount: faker.random.number({ min: 1, max: 5 })
    });
  }

  // let sql = "null";
  let billDate = faker.date.between("2019-02-01", "2019-02-28");
  // sql = `${sql},"${faker.random.alphaNumeric(5).toUpperCase()}"`; // BillNo
  // sql = `${sql},"${moment(billDate).format("YYYY-MM-DD")}"`; // BillDate
  // sql = `${sql},"${moment(billDate)
  //   .add(7, "d")
  //   .format("YYYY-MM-DD")}"`; // BillDue
  // sql = `${sql},"${faker.random.alphaNumeric(4).toUpperCase()}"`; // VID
  // sql = `${sql},"${faker.image.avatar()}"`; // VLogo
  // sql = `${sql},"${faker.address.streetAddress()}"`; // VAddr
  // sql = `${sql},"${faker.random.arrayElement(["PERCENTAGE","VALUE"])}"`; // DiscountType
  // sql = `${sql},"${faker.random.number({min:50,max:100})}"`; // DiscountValue
  // sql = `${sql},"${JSON.stringify(JSON.stringify(Data))}"`; // Data

  let sql =
    "INSERT INTO pub_bill_receipt (BillNo, BillDate, BillDue, VID, VName, VLogo, VAddr, DiscountType, DiscountValue, Data) values (";
  sql = `${sql}'${faker.random.alphaNumeric(5).toUpperCase()}',`;
  sql = `${sql}'${moment(billDate).format("YYYY-MM-DD")}',`;
  sql = `${sql}'${moment(billDate)
    .add(7, "d")
    .format("YYYY-MM-DD")}',`;
  sql = `${sql}'${faker.random.number(8)}',`; // VID
  sql = `${sql}'${faker.company.companyName().replace("'","''")}',`; // VName
  sql = `${sql}'${faker.image.avatar()}',`; // VLogo
  sql = `${sql}'${faker.address.streetAddress().replace("'","''")}',`; // VAddr
  sql = `${sql}'${faker.random.arrayElement(["PERCENTAGE","VALUE"])}',`; // DiscountType
  sql = `${sql}'${faker.random.number({min:50,max:100})}',`; // DiscountValue
  sql = `${sql}'${JSON.stringify(Data).replace("'","''")}');`; // Data
  console.log(sql);
  // console.log(Data);
}
