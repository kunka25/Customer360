
function previewImage(imageSrc, docName) {
   document.getElementById('modalImage').src = imageSrc;
   document.getElementById('modalTitle').textContent = docName;
   const downloadBtn = document.getElementById('downloadBtn');
   // if download doc
   downloadBtn.href = imageSrc;
   // downloadBtn.download = docName.replace(/\s+/g, '_') + '.jpg';
}
// scroll 
window.addEventListener('scroll', function () {
   const sidebar = document.getElementById('sidebar');
   const header = document.querySelector('header');
   const headerHeight = header.offsetHeight;

   if (window.scrollY > headerHeight) {
      sidebar.classList.add('fixed');
   } else {
      sidebar.classList.remove('fixed');
   }
});
// notification function 
const sidebar = document.getElementById("notification_sidebar");
const toggleBtn = document.getElementById("notification-btn");
const closeBtn = document.getElementById("closeBtn");

toggleBtn.addEventListener("click", () => {
   sidebar.classList.toggle("open");
});

closeBtn.addEventListener("click", () => {
   sidebar.classList.remove("open");
});
// close 
// darl light theme 
const btn = document.getElementById('themeToggle');
if (localStorage.getItem('theme') === 'dark') {
   document.body.classList.add('dark');
}

btn.addEventListener('click', () => {
   const isDark = document.body.classList.toggle('dark');
   localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
function initializeWidget() {
    /*
     * Subscribe to the EmbeddedApp onPageLoad event before initializing the widget 
     */
    ZOHO.embeddedApp.on("PageLoad", function (data) {

        /*
        
          */
        if (data && data.Entity) {
            /*
              
              * and insert the response into the dom
              */
            ZOHO.CRM.API.getRecord({ Entity: data.Entity, RecordID: data.EntityId })
                .then(function (response) {

                    document.getElementById("recordInfo").innerHTML = JSON.stringify(response, null, 2);
                });
        }

        /*
         * and insert the response into the dom
         */
        ZOHO.CRM.CONFIG.getCurrentUser()
            .then(function (response) {
                document.getElementById("userInfo").innerHTML = JSON.stringify(response, null, 2);
            });

    })
    /*
     * initialize the widget.
     */
    ZOHO.embeddedApp.init();
}
function fetchAccount() {
    var accountNumber = document.getElementById("Account_Number").value.trim();
    var input_error = document.getElementById("Account_Number");
    var validation_error = document.getElementById("validation");

    // Reset styles and messages
    input_error.style.border = "";
    validation_error.style.display = "none";
    validation_error.classList.remove("error");

    // Validate input
    if (accountNumber === "") {
        validation_error.innerHTML = "Please enter Customer ID";
        input_error.style.border = "1px solid red";
        validation_error.style.display = "block";
        validation_error.classList.add("error");
        return;
    } else if (isNaN(accountNumber)) {
        validation_error.innerHTML = "Please enter a valid numeric Customer ID";
        input_error.style.border = "1px solid red";
        validation_error.style.display = "block";
        validation_error.classList.add("error");
        return;
    }

    // Input is valid
    input_error.style.border = "1px solid green";

    var numericAccountNumber = parseInt(accountNumber);
    var timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error("Request timed out"));
        }, 10000); // 10 seconds timeout
    });

    Promise.race([
        ZOHO.CRM.API.searchRecord({
            Entity: "Deals",
            Type: "criteria",
            Query: `(Account_No:equals:${numericAccountNumber})`
        }),
        timeoutPromise
    ])
    .then(function (data) {
        console.log(data);
        if (data && data.data && data.data.length > 0) {
            var Deals = data.data[0];
            var contactName = Deals.Contact_Name.name;

            document.getElementById("name").textContent = contactName;
            document.getElementById("Name").textContent = contactName;
            document.getElementById("personName").textContent = contactName;
            document.getElementById("kyc_name").textContent = contactName;
         document.getElementById("accountNumber").innerText = Deals.Account_No || "N/A";
         document.getElementById("bank_acc_no").innerText = Deals.Account_No || "N/A";
          document.getElementById("cusId").innerText = Deals.Account_No || "N/A";
            document.getElementById('formContainer').style.display = 'none';
            document.getElementById('Container').style.display = 'block';
var lastDigit = parseInt(accountNumber.slice(-1), 10);

// Prepare image list based on even/odd
var imageIndex;
if (!isNaN(lastDigit)) {
    if (lastDigit % 2 === 0) {
        const evenImages = [2, 4, 6, 8, 10];
        imageIndex = evenImages[Math.floor(Math.random() * evenImages.length)];
    } else {
        const oddImages = [1, 3, 5, 7, 9];
        imageIndex = oddImages[Math.floor(Math.random() * oddImages.length)];
    }

    // Set image source
    var imageElement = document.getElementById("profileImage");
    imageElement.src = `./assets/img/image${imageIndex}.jpg`; // adjust path if different
}
            if (data && data.data && data.data.length > 0) {
            var deal = data.data[0];
            var contactID = deal.Contact_Name.id;
            if (contactID) {
                ZOHO.CRM.API.getRecord({
                    Entity: "Contacts",
                    RecordID: contactID
                }).then(function (contactData) {
                    console.log("Contact Data:", contactData);
                    if (contactData && contactData.data && contactData.data.length > 0) {
                        var contact = contactData.data[0];
                        document.getElementById("Phone").textContent = contact.Mobile || "N/A";
                        document.getElementById("phone").textContent = contact.Mobile || "N/A";
                        document.getElementById("Email").textContent = contact.Email || "N/A";
                        document.getElementById("email").textContent = contact.Email || "N/A";
                        document.getElementById("gender").textContent = contact.Gender || "N/A";
                        document.getElementById("phone_kyc").textContent = contact.Mobile || "N/A";
                        document.getElementById("Email_kyc").textContent = contact.Email || "N/A";
                        const addressParts = [
    contact.Address_Line_1,               
    contact.City_District,     
    contact.State_Province,                              
    contact.Country   
];
const fullAddress = addressParts.filter(Boolean).join(', ');
document.getElementById("livingAddress").textContent = fullAddress || "N/A";
const addressParts1 = [
    contact.Address_Line_1,               
    contact.City_District,     
    contact.State,                              
    contact.Country   
];
const fullAddress1 = addressParts1.filter(Boolean).join(', ');
document.getElementById("permanentAddress").textContent = fullAddress1 || "N/A";
                         let kycInfo = deal.KYC_Info; 
                        let kycId = kycInfo && kycInfo.id;
                        if (kycId) {
                            ZOHO.CRM.API.getRecord({
                                Entity: "KYC",
                                RecordID: kycId
                            }).then(function (kycResponse) {
                                console.log("KYC Response:", kycResponse);
                                if (kycResponse && kycResponse.data && kycResponse.data.length > 0) {
                                    let kycData = kycResponse.data[0];
                                    document.getElementById("dob").textContent = kycData.Date_of_Birth || "N/A";
                                    document.getElementById("dob_kyc").textContent = kycData.Date_of_Birth || "N/A";
                                    document.getElementById("occupation").textContent = kycData.Occupation || "N/A";
                                    document.getElementById("nationality").textContent = kycData.Nationality || "N/A";
                                    document.getElementById("gender_kyc").textContent = kycData.Date_of_Birth || "N/A";

// Calculate and display age
if (kycData.Date_of_Birth) {
    const dob = new Date(kycData.Date_of_Birth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    document.getElementById("age").textContent = age;
} else {
    document.getElementById("age").textContent = "N/A";
}

                                } 
                            }).catch(function (err) {
                                console.error("Error fetching KYC data:", err);
                            });
                        }
                    }
                   
                    })

                }
            
}
// ---------------Insurance----------------------------------------
if (data && data.data && data.data.length > 0) {
                var dealId = data.data[0].id;
                ZOHO.CRM.API.getRecord({
                    Entity: "Deals",
                    RecordID: dealId
                }).then(function(fullData) {
                    console.log("Full Deal Record with Subform:", fullData);
        
                    if (fullData && fullData.data && fullData.data.length > 0) {
                        var fullDealRecord = fullData.data[0];
        
                        if (fullDealRecord.Loans_Sub_Form && fullDealRecord.Loans_Sub_Form.length > 0) {
                            // Filter for "Term Insurance" products
                            var termInsuranceRecords = fullDealRecord.Loans_Sub_Form.filter(function(record) {
                                return record.Product && record.Product.name === "Term Insurance";
                            });
        
                            if (termInsuranceRecords.length > 0) {
                                termInsuranceRecords.forEach(function(Insurance, index) {
                                    console.log(`Insurance ${index + 1}:`, Insurance);
        
                                    var accountType = Insurance.Product ? Insurance.Product.name : 'N/A';
                                    var amount = Insurance.Amount || 'N/A';
                                    var tenure = Insurance.Tenure_Years || 'N/A';
                                    var ins = Insurance.Repayment_Amount_Monthly || 'N/A';
        
                                    document.getElementById('insureAccount').innerText = accountType;
                                    document.getElementById('insuredAmount').innerText = amount;
                                    document.getElementById('Insure-Tenure').innerText = tenure;
                                    document.getElementById('Insure-INS').innerText = ins;
        
                                    // Display the section
                                    document.getElementById('Insurancedetails').style.display = 'block';
                                });
                            } else {
                                console.log("No Term Insurance found in Loans_Sub_Form.");
                                document.getElementById('Insurancedetails').style.display = 'none';
                            }
                        } else {
                            console.log("No loan subform data found in Loans_Sub_Form.");
                            document.getElementById('Insurancedetails').style.display = 'none';
                        }
                    } else {
                        console.log("No full deal record found with the specified ID.");
                        document.getElementById('Insurancedetails').style.display = 'none';
                    }
                }).catch(function(error) {
                    console.error("Error fetching full record data:", error);
                });
            }
            if (data && data.data && data.data.length > 0) {
  var dealId = data.data[0].id;

  ZOHO.CRM.API.getRelatedRecords({
    Entity: "Deals",
    RecordID: dealId,
    RelatedList: "Attachments",
    page: 1,
    per_page: 200
  }).then(function(response) {
    console.log("Deal Attachments:", response);

    if (response && response.data) {
      populateAttachments(response.data);
    }
  });
}

function populateAttachments(attachments) {
  const tbody = document.getElementById("attachmentsBody");
  tbody.innerHTML = ""; // clear existing

  if (!attachments || attachments.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5">No attachments found.</td></tr>`;
    return;
  }

  attachments.forEach(file => {
    const fileName = file.File_Name || "Unnamed";
    const fileSize = file.Size ? (parseInt(file.Size) / 1024).toFixed(2) + " kB" : "—";
    const uploadDate = file.Created_Time ? new Date(file.Created_Time).toLocaleDateString() : "—";
    const previewUrl = file.$previewUrl || "#";
    const downloadUrl = file.$download_url || "#";

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>
        <div class="document-group">
          <label>${fileName}</label>
          <span>${fileSize}</span>
        </div>
      </td>
      <td>${uploadDate}</td>
      <td>20 May 2025</td>
      <td>
        <span class="status verified">
          <i class='bx bxs-badge-check me-1'></i>Verified
        </span>
      </td>
      <td>
        <div class="btn-group doc-action">
          <button type="button" class="btn"
            onclick="previewImage('${previewUrl}', '${fileName}')"
            data-bs-toggle="modal" data-bs-target="#imageModal">
            <i class='bx bx-show'></i>
          </button>
          <a type="button" class="btn" href="${downloadUrl}" download>
            <i class='bx bx-download'></i>
          </a>
        </div>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

// Image preview function (assumes you have modal with id="imageModal")
function previewImage(url, title) {
  document.getElementById("modalImage").src = url;
  document.getElementById("modalTitle").innerText = title;
}

        } else {
            validation_error.innerHTML = "No customer found with that ID.";
            input_error.style.border = "1px solid red";
            validation_error.style.display = "block";
            validation_error.classList.add("error");
        }
    })
    .catch(function (error) {
        console.error("Error during API call:", error);
        validation_error.innerHTML = "Failed to fetch customer. Please try again.";
        input_error.style.border = "1px solid red";
        validation_error.style.display = "block";
        validation_error.classList.add("error");
    });


// --------------------generate all account information and all details-----------------------------------------------

var func_name = "fetch_data";
var req_data ={
  "arguments": JSON.stringify({
      "Account_Number" : accountNumber 
  })
};
ZOHO.CRM.FUNCTIONS.execute(func_name, req_data)
.then(function(data){
    console.log("Function Response:", data)
    if (data && data.details) {
                if (data.details.userMessage.length > 1) {
                    var accountDataString = data.details.userMessage[1].split(": ")[1];
                    var accountData = JSON.parse(accountDataString);
                    if (accountData && accountData.Account_Number) {
                        document.getElementById("branchName").innerText = accountData.Branch_Name || "N/A";
                        document.getElementById("branchname").innerText = accountData.Branch_Name || "N/A";
                        document.getElementById("branch").innerText = accountData.Branch_Name || "N/A";
                        document.getElementById("status").innerText = accountData.Account_Status || "N/A";
                        document.getElementById("openingDate").innerText = accountData.Opening_Date || "N/A";
                        document.getElementById("accType").innerText = accountData.Account_Type || "N/A";
                        document.getElementById("bicCode").innerText = accountData.BIC_Code || "N/A";
                        document.getElementById("NID").innerText = accountData.Nation_ID || "N/A";
                        document.getElementById("bicCode_kyc").innerText = accountData.Nation_ID || "N/A";
                    }
                }
    }
     if (data.details.userMessage.length > 4) {
                    var loanDataString = data.details.userMessage[4].split(": ")[1];
                    var loanData = JSON.parse(loanDataString);
                    // console.log(loanData);
                    var accNo = loanData.Account_No || "N/A";
                    if (loanData) {
                        document.getElementById("loanType").innerText = loanData.Loan_Type || "N/A";
                        document.getElementById("accno").innerText = loanData.Account_No || "N/A";
                        document.getElementById("loanamount").innerText = loanData.Loan_Amount || "N/A";
                        document.getElementById("ROF").innerText = loanData.Rate_Of_Interest1 || "N/A";
                        document.getElementById("MRA").innerText = loanData.Monthly_Repayment || "N/A";

                        // if (accNo === "N/A") {
                        //     document.getElementById("loanDetailsSection").style.display = "none"; // Hide the entire section
                        // } else {
                        //     document.getElementById("loanDetailsSection").style.display = "block"; // Show the section
                        // }
                    } else {
                        alert("No loan details found.");
                    }
                }
                if (data.details.userMessage.length > 2) {
                    var savingsDataString = data.details.userMessage[2].split(": ")[1];
                    var savingsData = JSON.parse(savingsDataString);
                    if (savingsData) {
                        // var accNumber = savingsData.Account_No || "N/A";
                        document.getElementById("accountType").innerText = savingsData.Account_Type || "N/A";
                        document.getElementById("accnumber").innerText = savingsData.Account_No || "N/A";
                        document.getElementById("remainingBalance").innerText = savingsData.Remaining_Balance || "N/A";
                        document.getElementById("interest").innerText = savingsData.Interest || "N/A";
                        document.getElementById("cardNumber").innerText = savingsData.Card_Number || "N/A";
                        // if (accNumber === "N/A") {
                        //     // document.getElementById("savingsdetails").style.display = "none"; 
                        // } else {
                        //     document.getElementById("savingsdetails").style.display = "block"; 
                        // }
                    } 
                }
                if (data.details.userMessage.length > 3) {
                    var creditCardDataString = data.details.userMessage[3].split(": ")[1];
                    var creditCardData = JSON.parse(creditCardDataString);
                    if (creditCardData) {
                        document.getElementById("creditCardType").innerText = creditCardData.Account_Type || "N/A";
            document.getElementById("Accountnumber").innerText = creditCardData.Account_No || "N/A";
            document.getElementById("creditCardBalance").innerText = creditCardData.Current_Balance || "N/A";
            document.getElementById("creditCardInterest").innerText = creditCardData.Rate_Of_Interest || "N/A";
            document.getElementById("creditcardNumber").innerText = creditCardData.Card_Number || "N/A";
            // document.getElementById("creditcarddetails").style.display = (creditCardData.Account_No === "N/A" || creditCardData.Account_No === "") ? "none" : "block";
                    } 
                }
                
})





 
}



 
}

