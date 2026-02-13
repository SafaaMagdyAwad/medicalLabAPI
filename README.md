## medical lab
## database structure [doctors , patients , meducal tests , bookings ]
 - doctors [id , name , email , mobile , image , description ]
 - patients [id , name , email(optional) , mobile ]
 - medical tests [id , title , image (optional) , price , instructions ]
 - bookings [id , patientId , doctorId , medicalTests(array of obiects{id , price}) , totalPrice , booking code , ammountpaid , ammountRemaining ]
 
## System Users
 - Doctor [Add Medical reporst results , Add Medical tests(crud) ]
 - Assistant [Add patient data , Add Booking ]
 - patient [view his results if ammountRemaining ==0 using booking code ]

## flow 
 - patient go to the lab  meets assistsnt who store his personal data , book his required tests , tell him the total ammount , and stores the ammount paid if he paid, doctor fet a notification on email telling that there is a new booking , when doctor get the booking results he stores on the system  , patient get notification on email or mobile saying (his resuls are ready , with booking code ) ,if patient paid all the ammout the results will be able to see else he has to get to the lab to get his results 

## binefits 

Perfect 
You want **clear system benefits** for your Node.js Medical Lab System.

Here’s a professional, organized benefits section you can use in documentation or a proposal:

---

# System Benefits

## Organized Data Management

* All doctors, patients, tests, and bookings stored in a structured database.
* No paper records.
* Easy search by booking code, mobile number, or patient name.
* Reduced human errors.

---

## Faster Booking Process

* Assistant can:

  * Add patient data quickly
  * Select multiple tests
  * Auto-calculate total price
  * Record paid amount
  * Automatically calculate remaining balance

This makes reception workflow faster and more efficient.

---

## Automatic Financial Tracking

* System automatically calculates:

  * `totalPrice`
  * `amountPaid`
  * `amountRemaining`
* Easy to track unpaid bookings.
* Prevents financial mistakes.
* Clear visibility of lab revenue.

---

## Doctor Notification System

* Doctor receives email notification when:

  * New booking is created.
* Reduces delays.
* Improves workflow between assistant and doctor.

---

## Digital Medical Reports

* Doctor can:

  * Add test results digitally
  * Update or correct results
* Results stored permanently.
* No lost reports.
* Easy to retrieve history anytime.

---

## Secure Result Access for Patients

* Patient can only view results if:

  ```
  amountRemaining == 0
  ```
* Access using booking code.
* Protects lab revenue.
* Secure and controlled access.

---

## Notifications to Patients

* Patient gets:

  * SMS or Email when results are ready.
* Improves customer experience.
* Reduces unnecessary visits.

---

## Role-Based Access Control (RBAC)

Each user has limited permissions:

| Role      | Permissions                       |
| --------- | --------------------------------- |
| Doctor    | Add results, Manage medical tests |
| Assistant | Add patients, Create bookings     |
| Patient   | View results (if fully paid)      |

This improves:

* Security
* System stability
* Data protection



## Improved Lab Efficiency

* Reduced waiting time.
* Organized workflow.
* Clear communication between staff.
* Faster service delivery.



##  Business Growth Ready

* Can be expanded later to:

  * Online payments
  * Online booking
  * Admin dashboard analytics
  * Revenue reports
  * Multi-branch system



## Overall Impact

The system makes the lab:

* More professional
* More organized
* Financially controlled
* Faster
* More secure
* More scalable


//validation using joi