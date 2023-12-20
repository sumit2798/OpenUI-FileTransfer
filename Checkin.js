function checkIn(Inputs, Outputs) {
    try {
        var sFileName = this.GetField("FileName");
        var srvBO = TheApplication().GetBusObject("Server Logger BO");
        var srvBC = srvBO.GetBusComp("Server Logger BC");
        var sCurUser = TheApplication().LoginName();
        var RetValue = "";
        var sProceed = "Y";
        var sVersion = "";
        var sLockedUsr = "";
        var sCurVersion = "";
        var sLckdRowId = "";
        var sFileupldd = "";
        var sFileExt = "";
        sFileExt = this.GetField("FileExtension");
        /* Plese fill the LOV as per name you have setup*/
        var js_filepath= TheApplication().LookupValue("","");
        var server=TheApplication().LookupValue("","");
        var img_file_path=TheApplication().LookupValue("","");
        var css_file_path=TheApplication().LookupValue("","");
        var server_file_path=TheApplication().LookupValue("","");
        

        
            with (srvBC) {
                SetViewMode(AllView);
                ClearToQuery();
                ActivateField("Status");
                ActivateField("Object Name");
                ActivateField("Login Id");
                ActivateField("Version");
                SetSearchExpr("[Status] = 'Locked' AND [Login Id] = '" + sCurUser + "' AND [Object Name] = '" + sFileName + "' AND [Version] IS NOT NULL");
                ExecuteQuery(ForwardBackward);
                if (!FirstRecord()) {
                    Outputs.SetProperty("Status", "Not_Locked");
                    sProceed = "N"
                } else {
                    sLckdRowId = GetFieldValue("Version");
                    sVersion = GetFieldValue("Version");
                    if (sVersion == "" || sVersion == null) {
                        sVersion = 0;
                    } else {
                        sVersion = ToNumber(sVersion) + 1;
                    }
                }
            }


            if (sProceed == "Y") {
                var sComm = "";
                var sFile = "";
                if (FirstRecord()) {
                    sComm = this.GetFieldValue("Comments");
                    sFile = this.GetFieldValue("FileName");
                    if (sComm == "") {
                        TheApplication().RaiseErrorText("Please enter your 'NAME' and 'SHORT DESCRIPTION' related to this file movement in comments field to proceed further!!");
                    }
                }
                
                sFileupldd = "Y";
                    
                with (srvBC) {
                        NewRecord(NewAfter);
                        SetFieldValue("Object Name", sFile);
                        SetFieldValue("Error Type", "CHECK_IN");
                        SetFieldValue("Object Type", "File Movement");
                        SetFieldValue("Transaction Name", sComm);
                        SetFieldValue("Login Id", TheApplication().LoginName());
                        SetFieldValue("Status", "Unlocked");
                        SetFieldValue("Version", sVersion);
                        WriteRecord();
                        Outputs.SetProperty("Status", "Checked_In");
                        if (sLckdRowId != "") {
                            SetViewMode(3);
                            ClearToQuery();
                            SetSearchSpec("Id", sLckdRowId);
                            if (FirstRecord()) {
                                SetFieldValue("Status", "Unlocked");
                                WriteRecord();
                            }
                        }
                    
                }
                var expr="";
                server_file_path=server_file_path+"\\"+sFileName+"*."+sFileExt;
                //do check the server_file_path once 
                if(server=="Linux"){
                    expr="mv "
                    if(sFileExt=="js"){
                        expr= expr+ server_file_path+" "+js_filepath;
                    }
                    else if(sFileExt=="css"){
                        expr= expr+ server_file_path+" "+css_filepath
                    }
                    else if(sFileExt=="png")//Please add respective image format here
                    {
                        expr= expr+ server_file_path+" "+css_filepath
                    }
                Clib.system(expr);
                }
                else{
                    expr="MOVE "
                    if(sFileExt=="js"){
                        expr= expr+ server_file_path+" "+js_filepath;
                    }
                    else if(sFileExt=="css"){
                        expr= expr+ server_file_path+" "+css_filepath
                    }
                    else if(sFileExt=="png")//Please add respective image format here
                    {
                        expr= expr+ server_file_path+" "+css_filepath
                    }
                Clib.system(expr);
                }

                TheApplication().RaiseErrorText("File Checked in Successfully");
                return (CancelOperation);
            }

            if (sProceed == "N" || sFileupldd == "") {
                Outputs.SetProperty("Neglect_Err", "Y");
                TheApplication().RaiseErrorText("Kindly use check-out/check-in logic to upload the file!");
            }
        
    } catch (e) {
        throw (e);
    }
    finally {
        srvBO=null;
        srvBC=null;
     }
}
