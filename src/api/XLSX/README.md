# XLSX Directory :file_folder:

This directory acts as a transient storage point for these files, ensuring that they are available for email attachments while being promptly removed to maintain data privacy and efficient use of storage resources. :email:

Here's how this directory is used:

1. **Temporary Storage:** When an application is submitted, the system generates an XLSX file containing relevant data or reports. The XLSX file is temporarily stored here.

2. **Email Notification:** The XLSX file is then sent to the underwriting team via an APIM call for review and further offline processing.

3. **Immediate Deletion:** Once the email is successfully sent, the corresponding XLSX file is promptly deleted from this directory. This deletion helps maintain data security and prevent unnecessary storage consumption.

---
