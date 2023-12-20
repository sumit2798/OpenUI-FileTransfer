# OpenUI-FileTransfer
This repository holds build guide to make file movement in Siebel easy and better logger so that it will easy for openui developer.
Disclaimer: It must be used in Lower Dev Environment not suggested to make in Pre-Production or Production Environment
The problems with exisisting are as follow:<br>
1.) Admin's help needed when we have file to move to custom folder<br>
2.) Winscp hosting for each troubles lot of developer while version kept<br>
3.) No track of Developer and Idea on who did the recent UI changes.<br>

So I am providing generic code here since many clients may use diffrent types of OS. Based on that do configure the LOV for path and OS version

**Configuration**<br>
1.)	Server File Path(where the file is Stored)<br>
2.)	Server Model(Linux or Windows)<br>
3.)	System Preference (File Access)<br>
4.)	Manifest Administration path(not config but change)<br>
5.)	Custom Log Table (U can use Existing Table also New Table Helps to Track easier)<br>

**Setup**<br>
Before starting the Building , The we will configure the server File Path like siebelsrv/scripts/ , siebelsrv/images/ , siebelsrv/css/ in the path. Also make sure one LOV to put value for Windows and Linux of the server name . <br>
<table>
<tr><td>Type</td><td>Value</td><td>LIC</td></tr>
<tr><td>SRV_PATH</td><td>css_file_pathe</td><td>CSS</td></tr>
<tr><td>SRV_PATH</td><td>	js_file_path</td><td>Js</td></tr>
<tr><td>SRV_PATH</td><td>	Image_path</td><td>	Image</td><tr>
<tr><td>SRV_MODEL</td><td>	LINUX/WINDOWS	</td><td>MODEL</td><tr>
</table>
<br>
At System Preference Add the Following 
<i><b>Allow File System Access = TRUE</b></i><br>
<b>Reccomended</b> : Use CSSBCFile method to upload and download file
<br><br>
<b><u>NEW CUSTOM TABLE KEY COLOUMN</b></u><br>
1.)	Status<br>
2.)	Object Name<br>
3.)	Login<br>
4.)	Version<br>
5.)	Error<br>
<br><br>
<i>Now Lets build Screen and View to upload File and Required Applet for File Attachment and movement of file .</i><br>

Create a Screen, Consider building View with File Attachment , Let me tell what buttons to be added and what drop down we need to add in it.
You can take any File Attachment , consider taking Responsibility Attachment, Opportunity Attachment Server, Agreement New Attachment.<br>
<i>Optional: You can add Manifest Applet in the Screen </i>
Check the below diagram to understand the setup
![image](https://github.com/sumit2798/OpenUI-FileTransfer/assets/42507060/c4f762c7-7a96-4d9b-868c-aae0209e8787)

<br>
We have three button on Attachment Applet , Lets Dive each buttons.We have three button on Attachment Applet , Lets Dive each BC level script one by one buttons and code walkthrough of each .<br>
<b>Please refer the code attached in repo and make changes based on it.</b><br>
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












