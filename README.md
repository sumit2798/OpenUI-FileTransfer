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
_**Allow File System Access = TRUE**_
**Reccomended** : Use CSSBCFile method to upload and download file



