<h1>High-Level Design (HLD) and Design Document</h1><br>
OpenUI-FileTransfer<br>
Overview

The OpenUI-FileTransfer repository aims to simplify and enhance the file movement process in Siebel OpenUI, providing a better logger for OpenUI developers. It is crucial to note that this solution should be used only in Lower Dev Environments and is not recommended for Pre-Production or Production Environments.
<br><b><h3>Problems Addressed</b></h3>

    Dependency on Admin for File Movement:
        Developers often need administrator assistance to move files to custom folders.

    Winscp Hosting Challenges:
        Hosting files on Winscp poses difficulties for developers, especially when dealing with version changes.

    Lack of Developer Tracking:
        Absence of a tracking mechanism for UI changes and identification of the responsible developer.

Configuration

    Server File Path:
        Specify the server file path where the files are stored (e.g., siebelsrv/scripts/, siebelsrv/images/).

    Server Model:
        Choose the server model (Linux or Windows).

    System Preference (File Access):
        Set the System Preference for File Access to TRUE.

    Manifest Administration Path:
        Not a configuration step, but the path needs to be changed during administration.

    Custom Log Table:
        Optional but recommended for better tracking. Create a new table or use an existing one.
        
<h3>Process of Building</h3>
<i>Now Lets build Screen and View to upload File and Required Applet for File Attachment and movement of file .</i><br>

Create a Screen, Consider building View with File Attachment , Let me tell what buttons to be added and what drop down we need to add in it.
You can take any File Attachment , consider taking Responsibility Attachment, Opportunity Attachment Server, Agreement New Attachment.<br>
<i>Optional: You can add Manifest Applet in the Screen </i>
Check the below diagram to understand the setup
![image](https://github.com/sumit2798/OpenUI-FileTransfer/assets/42507060/c4f762c7-7a96-4d9b-868c-aae0209e8787)

Screen and View Creation

    Screen and View Setup:
        Create a screen with a view that includes file attachment functionality.

    Optional: Manifest Applet:
        Add a manifest applet to the screen (optional).

    Button Configuration:
        Configure buttons on the attachment applet for file check-in, check-out, and undo check-out.

Code Walkthrough

    Check-In:
        Additional field for comments to reference modifications.
        Works for both new and existing check-ins.

    Check-Out:
        Locks the file under the developer's name.
        Requires the filename as input.

    Undo Check-Out:
        Used to revert a checked-out file to the previous version.
<br>
We have three button on Attachment Applet , Lets Dive each buttons.We have three button on Attachment Applet , Lets Dive each BC level script one by one buttons and code walkthrough of each .<br>

<b><span style color="red">All the code can be lied in the WriteRecord of BC or you can all the function onclick trigger event in PR files </style>></b>
<b>Please refer the code attached in repo and make changes based on it.</b></span><br>
<u><b>Check-in</u></b><br>
In the  set of code written at BC level , we are considering one extra field to be added that is comment for the reference when the file uploaded we can check what was the modification made for.It works for both new and existing checkin.<br>
<u><b>Check-out</u></b><br>
This code will help you to check out lock under your name so that no other person check out and utilizes the code. Do remember here file name need to passed as input either u make in bs script for above or at BC you can use GetFieldValue for the value of Filename. Either way is fine both will work.<br>
<u><b>Undo Check-out</u></b><br>
Undo -checkout is used for Checking the file checkedout to revert back the old version to work upon.
<br><br>
<b>Bonus</b>
We can add-ons like file diffrentioner from old and new by using certian jquery pop-up plugin (under progress).<br>
Method like GetFile not locking anything .We can use code Differentiation on the screen which can help to compare last checked in and current File












