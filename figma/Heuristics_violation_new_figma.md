# Study Sync Project


## Desktop Prototype Violations

1. **Issue 1: H5 Error Prevention**
   - *Where:* "Pair/Mentor request notifications"
   - *What:* Missing confirmation alert when clicking on accept/reject buttons.
   - *Why:* Users may mistakenly choose an option with no chance to correct. A confirmation alert should allow double-checking.
   - *Severity:* 3

2. **Issue 2: H1 Visibility of System Status**
   - *Where:* "Find pair" page
   - *What:* Incomplete user information triggers an error when using filters.
   - *Why:* Users may be unaware of incomplete profiles until specific actions. Informing on the homepage or during registration could address the issue.
   - *Severity:* 3

3. **Issue 3: H4 Consistency and Standard**
   - *Where:* "Find pair" and "Find a mentor" pages
   - *What:* Filters toggle missing
   - *Why:* Inconsistency in the absence of a "Filters" toggle on pages with similar functionality.
   - *Severity:* 2

4. **Issue 4: H4 Consistency and Standard**
   - *Where:* "View Pair List," "Assigned Students," and "View mentors" pages
   - *What:* Filters toggle doesn't hide filters
   - *Why:* Even when turned off, filter fields are displayed, causing confusion.
   - *Severity:* 2

5. **Issue 5: H4 Consistency and Standard**
   - *Where:* "View Pair List," "Assigned Students," and "View mentors" pages
   - *What:* Search/Reset button missing
   - *Why:* Lack of search and reset buttons, unlike other search pages, creates inconsistency.
   - *Severity:* 2

6. **Issue 6: H3 User Control and Freedom**
   - *Where:* "User Chat"
   - *What:* Missing standard "close" button
   - *Why:* Closing the chat widget is unconventional, leading to potential user errors.
   - *Severity:* 1

7. **Issue 7: H5 Error Prevention**
   - *Where:* "View Pair list," "Assigned Students," and "View mentors" pages
   - *What:* Missing confirmation alert when clicking "remove from list" button
   - *Why:* Removing a user without warning may occur accidentally. A confirmation alert is needed.
   - *Severity:* 4

8. **Issue 8: H5 Error Prevention**
   - *Where:* "View Study plan list"
   - *What:* Missing confirmation alert when clicking delete button
   - *Why:* Deleting an entry without confirmation may lead to unintended removal.
   - *Severity:* 3

9. **Issue 9: H3 User Control and Freedom**
   - *Where:* "Add new Study Plan"
   - *What:* Missing "cancel" (or return) button
   - *Why:* Users should have the option to cancel the addition of a new plan.
   - *Severity:* 1

10. **Issue 10: H1 Visibility of System Status**
    - *Where:* "View Pair list," "Assigned Students," and "View mentors" pages
    - *What:* No notification for the removed/accepted user
    - *Why:* Users need information on changes in status without explicitly checking list pages.
    - *Severity:* 3

11. **Issue 11: H5 Error Prevention**
    - *Where:* "Becoming a mentor" "Edit Your information," and "Add/Edit study plan" pages
    - *What:* Clicking on "STUDY SYNC" or the browser's back button without submitting the form
    - *Why:* Users receive no warning about potential loss of form data.
    - *Severity:* 3

12. **Issue 12: H6 Recognition Rather Than Recall**
    - *Where:* Calendar option for "Add your study plan"
    - *What:* Calendar option for selecting study plan dates
    - *Why:* Including a calendar-style date selection improves user recognition and selection ease.
    - *Severity:* 2

## Mobile Application Prototype Violations

### Issues

1. **Issue 1: H5 Error Prevention Operations**
    - **Where:** Contact page
    - **What:** Obvious delete button
    - **Why:** Easy deletion of contacts leading to potential mistakes
    - **Severity:** 2

2. **Issue 2: H4 Consistency and Standards**
    - **Where:** Contact page
    - **What:** Inconsistent layout with the home page, pending section, and existing contacts section
    - **Why:** Inconsistent layout can confuse users
    - **Severity:** 2

3. **Issue 3: H4 Consistency and Standards**
    - **Where:** Contact page
    - **What:** Unclear placement of reject and accept buttons on user cards when scrolling
    - **Why:** Lack of clarity for users in manipulating specific fields
    - **Severity:** 4

4. **Issue 4: H4 Consistency and Standards**
    - **Where:** Contact page
    - **What:** Similar to the previous issue but for contact buttons
    - **Why:** Not clear which specific field the user can manipulate
    - **Severity:** 4

5. **Issue 5: H5 Error Prevention**
    - **Where:** Contact page
    - **What:** Unlinked buttons may lead to deleting the wrong contact
    - **Why:** Creates an error-prone situation
    - **Severity:** 4

6. **Issue 6: H4 Consistency and Standards**
    - **Where:** Group page
    - **What:** "Create a group" button is not clickable
    - **Why:** Violation of common standards where all available buttons should be clickable
    - **Severity:** 4

7. **Issue 7: H4 Consistency and Standards**
    - **Where:** Group page
    - **What:** Inconsistent layout with the home screen
    - **Why:** Design inconsistency with the rest of the app
    - **Severity:** 3

8. **Issue 8: H4 Consistency and Standards**
    - **Where:** Group page
    - **What:** Call and delete group buttons are not embedded in the group card
    - **Why:** Not clear to which group they belong when scrolling
    - **Severity:** 3

9. **Issue 9: H4 Consistency and Standards**
    - **Where:** Group page
    - **What:** Home button is not centered
    - **Why:** Deviation from the common standard of centering elements
    - **Severity:** 1

10. **Issue 10: H4 Consistency and Standards**
    - **Where:** "Add Study Plan" page
    - **What:** Inconsistency in button labels ("Submit" vs. "Add")
    - **Why:** Inconsistency between the action/task and the button may create confusion
    - **Severity:** 2

11. **Issue 11: H3 User Control and Freedom**
    - **Where:** "Add Study Plan" page
    - **What:** Missing back(exit) button
    - **Why:** Lack of a back button makes maneuvering harder and poses a risk of getting stuck
    - **Severity:** 4

12. **Issue 12: HN Non-heuristic Issue**
    - **Where:** "Add Study Plan" page
    - **What:** Limitations in choosing timeslots
    - **Why:** Limits the website's ability to add study plans with specific times
    - **Severity:** 3

13. **Issue 13: H3 User Control and Freedom**
    - **Where:** "Become a Mentor" page
    - **What:** Missing back(exit) button
    - **Why:** Lack of a back button makes maneuvering harder and poses a risk of getting stuck
    - **Severity:** 4

14. **Issue 14: H3 User Control and Freedom**
    - **Where:** "Become a Mentor" page
    - **What:** Missing back(exit) button
    - **Why:** Lack of a back button makes maneuvering harder and poses a risk of getting stuck
    - **Severity:** 4

15. **Issue 15: H8 Aesthetic and Minimalist Design**
    - **Where:** User home without info
    - **What:** Too much text on the screen
    - **Why:** Decreases usability and causes information overload
    - **Severity:** 2

16. **Issue 16: H6 Recognition rather than Recall**
    - **Where:** User Home page
    - **What:** Call-to-action text with no form provided
    - **Why:** Requires users to remember instructions, causing potential confusion
    - **Severity:** 3

17. **Issue 17: H4 Consistency and Standards**
    - **Where:** User home page
    - **What:** Unclear purpose of buttons in the navbar for first-time users
    - **Why:** Button design doesn't match general standards, and no text provides indications
    - **Severity:** 2

18. **Issue 18: H10 Help and Documentation**
    - **Where:** User home page
    - **What:** Functionality of buttons not comprehensible from the interface alone
    - **Why:** Insufficient documentation to understand button consequences
    - **Severity:** 2

19. **Issue 19: H4 Consistency and Standards**
    - **Where:** Between home complete and user home page
    - **What:** Inconsistent use of an icon in the navbar
    - **Why:** User confusion due to different icons for the same action
    - **Severity:** 4

20. **Issue 20: H4 Consistency and Standards**
    - **Where:** Timetable void page
    - **What:** User specifies unavailability instead of defining time periods of free time
    - **Why:** Deviates from the standard in calendar apps, complicating the process
    - **Severity:** 3

21. **Issue 21: H1 Visibility of System Status**
    - **Where:** Public contact page
    - **What:** No indication of contact request status
    - **Why:** Insufficient feedback about the action for the user
    - **Severity:** 3

22. **Issue 22: H4 Consistency and Standards**
    - **Where:** Contact page
    - **What:** Inconsistent layout with the home page, pending section, and existing contacts section
    - **Why:** Inconsistency in layout can confuse users
    - **Severity:** 2

23. **Issue 23: H4 Consistency and Standards**
    - **Where:** Contact page
    - **What:** Unclear placement of reject and accept buttons when scrolling. Suggestion to embed them in the card
    - **Why:** Lack of clarity for users in manipulating specific fields
    - **Severity:** 4

24. **Issue 24: H4 Consistency and Standards**
    - **Where:** Contact page
    - **What:** Similar to the previous issue but for contact buttons
    - **Why:** Not clear which specific field the user can manipulate
    - **Severity:** 4

25. **Issue 25: H5 Error Prevention**
    - **Where:** Contact page
    - **What:** Unlinked buttons may lead to deleting the wrong contact
    - **Why:** Creates an error-prone situation
    - **Severity:** 4

26. **Issue 26: HN Non-heuristic Issue**
    - **Where:** Home page complete
    - **What:** Inability to see contacts directly on the home screen
    - **Why:** Lack of usability; users can't see available contacts for immediate actions
    - **Severity:** 3


## Selected Paper Prototype and Why
   - We preferred the Desktop prototype because:
      1. The study plan's complex interface can be more manageable in a larger prototype (desktop).
      2. Desktop prototype had fewer violations than the mobile application prototype.
      3. Some violations in the mobile version required extra effort, such as adding new pages.

## Features Moved from Mobile Application to Desktop

 - As the additional features in the mobile prototype brought unnecessary complexity and weren't directly tied to the main tasks, we chose not to transfer any new features to the desktop version. Our aim is to maintain simplicity for the users.

## Plan for Hi-Fi Prototype, Referring to the List of Violations for Desktop Prototype

   - **Issue 1:** Implementing a simple popup to request user confirmation for accepting or rejecting a request will swiftly address this matter. This solution is straightforward and easily achievable.
   - **Issue 2:** Enhancing user awareness by displaying a notification on the homepage, advising users to complete their profile for optimal functionality. This modification is a quick and straightforward fix.
   - **Issue 3:** Introducing a filter toggle on the "Find Pair" and "Find Mentor" pages empowers users to manage filters effortlessly. This enhancement is a straightforward resolution.
   - **Issue 4:** Creating new pages mirroring the structure of "View Pair List," "Assigned Students," and "View Mentors," with filters hidden when the toggle is off. Addressing this involves a moderate level of effort.
   - **Issue 5:** Standardizing the appearance of pages by adding search and reset buttons to "View Pair List," "Assigned Students," and "View Mentors" pages. This refinement is an uncomplicated fix.
   - **Issue 6:** Simplifying user interaction by incorporating a designated close button for the chat feature. This adjustment ensures users intuitively understand how to close the chat, avoiding sudden disappearances on inadvertent clicks.
   - **Issue 7:** Enhancing user confidence with a confirmation alert before deleting a user from the pairs list, assigned students, or mentors on "View Pair List," "Assigned Students," and "View Mentors" pages. This improvement is straightforward.
   - **Issue 8:** Instilling confidence in users by introducing a confirmation alert before deleting a row from the study plan on the "View Study Plan" page. This enhancement is an uncomplicated fix.
   - **Issue 9:** Successfully resolving this issue by incorporating a cancel button in the prototype for adding a study plan, aligning with the assignment's requirements.
   - **Issue 10:** Promoting user awareness through a notification for status changes when another user accepts or rejects a request. This solution is easily implementable.
   - **Issue 11:** Implementing a notification when users attempt to navigate away from "Becoming a Mentor," "Edit Your Information," or "Add/Edit Study Plan" pages without submitting the form. This enhancement ensures users are informed about potential data loss and offers a user-friendly experience.
   - **Issue 12:** Proactively addressing this concern by integrating a calendar into the "Add Study Plan" page, providing users with a convenient and intuitive date selection experience.

Find Pairs Figma: https://www.figma.com/proto/0gMza8ccObvoXBomZjGevx/Find-pairs?type=design&node-id=9-233&t=E2mJRc8dpEPBy11h-0&scaling=scale-down&page-id=0%3A1&starting-point-node-id=9%3A233

Add Study Plan Figma: https://www.figma.com/proto/lhEYosexZZgt5hX0VWbxjV/Study-plan-(upper-bar-done)?type=design&node-id=22-173&t=J8cZSUN1b9IJrpZ2-0&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=22%3A173
