function doPost(e) {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const raw = e && e.postData && e.postData.contents ? e.postData.contents : "{}";
    const data = JSON.parse(raw);

    if (data.formType === "approved_adults_emergency_contacts") {
      return handleContactsUpdate(spreadsheet, data);
    }
    if (data.formType === "key_fob_replacement") {
      return handleKeyFobRequest(spreadsheet, data);
    }
    return handleEmergencyProgramChange(spreadsheet, data);

  } catch (error) {
    return jsonResponse({ ok: false, error: String(error && error.message ? error.message : error) });
  }
}

function handleEmergencyProgramChange(spreadsheet, data) {
  const sheet = spreadsheet.getSheets()[0];
  if (!sheet) return jsonResponse({ ok: false, error: "No sheet tab found." });
  function formatDate(d) {
    if (!d) return "";
    var parts = d.split("-");
    if (parts.length === 3) return parts[1] + "/" + parts[2] + "/" + parts[0];
    return d;
  }
  sheet.appendRow([
    new Date(),
    data.studentName || "",
    data.studentClassroom || "",
    data.personRequestingChange || "",
    formatDate(data.dateOfRequest),
    formatDate(data.dateOfEmergencyProgramChange),
    data.dropOffOrPickUpTime || "",
    data.regularProgramHours || "",
    data.parentEmail || ""
  ]);
  return jsonResponse({ ok: true, message: "Row added." });
}

function handleContactsUpdate(spreadsheet, data) {
  const tabName = "Approved Adults & Emergency Contacts";
  let sheet = spreadsheet.getSheetByName(tabName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(tabName);
    sheet.appendRow(["Timestamp","Student Name","Student Classroom","Your Name","Pickup Name","Pickup Phone","Pickup Relationship","Emergency Contact Name","Emergency Contact Phone","Emergency Contact Relationship","Parent Email"]);
  }
  sheet.appendRow([
    new Date(),
    data.studentName || "",
    data.studentClassroom || "",
    data.requesterName || "",
    data.pickupName || "",
    data.pickupPhone || "",
    data.pickupRelationship || "",
    data.emergencyName || "",
    data.emergencyPhone || "",
    data.emergencyRelationship || "",
    data.parentEmail || ""
  ]);
  return jsonResponse({ ok: true, message: "Row added to contacts tab." });
}

function handleKeyFobRequest(spreadsheet, data) {
  const tabName = "Key Fob Requests";
  let sheet = spreadsheet.getSheetByName(tabName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(tabName);
    sheet.appendRow(["Timestamp","Requester Name","Number of Fobs","Student Name","Student Classroom","Parent Email"]);
  }
  sheet.appendRow([
    new Date(),
    data.requesterName || "",
    data.quantity || "",
    data.studentName || "",
    data.studentClassroom || "",
    data.parentEmail || ""
  ]);
  return jsonResponse({ ok: true, message: "Key fob request added." });
}

function doGet() {
  return jsonResponse({ ok: true, message: "Webhook is running." });
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
