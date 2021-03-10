<?php

function postHTTP($url, $data)
{
    $dataJSON = json_encode($data);
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $dataJSON);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Content-Length: ' . strlen($dataJSON))
    );
    curl_setopt($ch, CURLOPT_TIMEOUT, 5);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
    $output = curl_exec($ch);
    echo "POSTING " . $dataJSON . "\n";
    curl_close($ch);
    return $output;
}

echo "Adding new bill";

$data = postHTTP("http://localhost/ci-api/Bills/createBill", array(
    "BillDate" => "2019-03-29",
    "BillDue" => "2019-04-07",
    "VID" => 1,
    "VName" => "Vendor Name 01",
    "VLogo" => "https://www.designevo.com/res/templates/thumb_small/blue-square-and-virtual-world.png",
    "VAddr" => "Vendor Address 01",
    "DiscountType" => "PERCENTAGE", // PERCENTAGE, VALUE
    "DiscountValue" => 10, // 10%
    "AgentCode" => "AGENT-01",
    "AgentName" => "Agent Name 01",
    "AgentMobile" => "09xxxxxxxx",
    "Active" => 1,
    "data" => array(
        "ShipTypes" => array( // วิธีการจัดส่ง
            array(
                "description" => "EMS",
                "rate" => 30, // EMS Rate charge
            ),
            array(
                "description" => "LALAMOVE",
                "rate" => 100,
            ),
        ),
        "BankAccounts" => array( // วิธีการชำระเงิน
            array( // สำหรับระบบ COD ให้กำหนดแบบนี้
                "type" => "COD",
            ),
            array( // สำหรับแบบโอนเงินผ่านธนาคาร
                "BankName" => "Bangkok Bank",
                "abbr" => "bbl", // important this code must be lowercase of abbrivation of the bank and will link to bank logo
                "BankOwner" => "ชื่อเจ้าของบัญชี",
                "BankAccNo" => "123-45678-90", // เลขที่บัญชี
            ),
        ),
        "items" => array( // รายการสินค้า
            array(
                "SKU" => "SKU1",
                "Description" => "Item description 1",
                "UnitName" => "unit",
                "PricePerUnit" => 120,
                "Amount" => 2,
            ),
            array(
                "SKU" => "SKU2",
                "Description" => "Item description 2",
                "UnitName" => "unit",
                "PricePerUnit" => 100,
                "Amount" => 1,
            ),
        ),
    ),
));

echo "Data added result: " . $data . "\n";

echo "==================\n";
echo "Update status to have error on payment\n";
$data = json_decode($data,true);
$update_result = postHTTP(
  'http://localhost/ci-api/Bills/updateStatus',
  array("id" => $data['data']['id'],
  "status" => "ERROR_PAYMENT", "error" => "Incorrect payment"));

/*
Available Status

NEW = บิลใหม่ (รอยืนยันการโอนเงิน)
WAIT_FOR_ADDRESS = รอลูกค้าใส่ข้อมูลที่อยู่
CHECK_PAYMENT = รอการตรวจสอบหลักฐานการโอนเงิน
PREPARE_ITEMS = กำลังจัดส่ง
ITEMS_SENT = ส่งสินค้าแล้ว
ERROR_PAYMENT = ผิดพลาดเกี่ยวกับการโอนเงิน
ERROR_ADDRESS = ที่อยู่จัดส่งผิดพลาด

สถานะ ERROR_PAYMENT และ ERROR_ADDRESS จะต้องส่ง ฟิลด์ error เพื่อแจ้งลูกค้าด้วย

สถานะ ITEMS_SENT จะต้องส่ง ฟิลด์ tracking เพิ่มดังตัวอย่างข้างล่างนี้
$update_result = postHTTP(
  'http://localhost/ci-api/Bills/updateStatus',
  array("id" => $data['data']['id'],
  "status" => "ITEMS_SENT", "TrackingNo"=>"http://xxxx.com/uri-path"));

*/
$update_result = postHTTP(
  'http://localhost/ci-api/Bills/updateStatus',
  array("id" => $data['data']['id'],
  "status" => "ITEMS_SENT", "TrackingNo"=>"http://xxxx.com/uri-path"));
echo "Result: " . $update_result . "\n";