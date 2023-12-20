function checkOut(Inputs, Outputs) {
    try {
        var sFileName = Inputs.GetProperty("FileName");
        var srvBO = TheApplication().GetBusObject("Server Logger BO");
        var srvBC = srvBO.GetBusComp("Server Logger BC");
        var sCurUser = TheApplication().LoginName();
        var sLockedUsr = "";
        var sCurVersion = "";
        var sTimeDiff = "";
        var sTimeDiffInSecs = "";
        var sExctDiff = "";
        var sTimeStsfd = "Y";
        var sRcntUsr = "";
        var sOprtn = "";

        /* The below set of code is optional is used for covering upload file movement on Uploading*/
        var sAcceptedDiff = TheApplication().InvokeMethod("LookupValue", "CHECKOUT_TIME_DIFF", "TIME_DIFF");
        with (srvBC) {
            SetViewMode(AllView);
            ClearToQuery();
            ActivateField("Object Name");
            ActivateField("Version");
            ActivateField("Error Type");
            ActivateField("Login Id");
            ActivateField("Time diff calc");
            SetSearchSpec("Object Name", sFileName);
            SetSearchExpr("[Object Name] = '" + sFileName + "'")
            SetSortSpec("Created(DESCENDING)");
            ExecuteQuery(ForwardBackward);
            if (FirstRecord()) {
                sTimeDiff = GetFieldValue("Time diff calc");
                sCurVersion = GetFieldValue("Version");
                sRcntUsr = GetFieldValue("Login Id");
                sOprtn = GetFieldValue("Error Type");
                sTimeDiffInSecs = ToNumber(ToNumber(sTimeDiff) * 84000);
                if (sAcceptedDiff != "") {
                    sAcceptedDiff = ToNumber(sAcceptedDiff) * 60;
                    if (ToNumber(sAcceptedDiff) > ToNumber(sTimeDiffInSecs)) {
                        sTimeStsfd = "N";
                        sExctDiff = ToNumber(sAcceptedDiff) - ToNumber(sTimeDiffInSecs);
                    }
                }
                if (sCurVersion == "" || sCurVersion == null) {
                    sCurVersion = 0;
                }
            }
        }

        /*The below code will help you to lock the object */
        with (sActBC) {
            SetViewMode(AllView);
            ClearToQuery();
            ActivateField("Status");
            ActivateField("Object Name");
            ActivateField("Login Id");
            ActivateField("Version");
            SetSearchExpr("[Status] = 'Locked' AND [Object Name] = '" + sFileName + "'");
            ExecuteQuery(ForwardBackward);
            if (FirstRecord()) {
                sLockedUsr = GetFieldValue("Login Id");
                if (sLockedUsr == sCurUser) {
                    SetViewMode(AllView);
                    ClearToQuery();
                    ActivateField("Status");
                    ActivateField("Object Name");
                    ActivateField("Login Id");
                    ActivateField("Version");
                    SetSearchExpr("[Status] = 'Locked' AND [Object Name] = '" + sFileName + "' AND [Login Id] = '" + sLockedUsr + "'");
                    ExecuteQuery(ForwardBackward);
                    if (FirstRecord()) {
                        Outputs.SetProperty("Status", "Already_Checked_Out");
                    }
                } else {
                    Outputs.SetProperty("Locked_By", sLockedUsr);
                    Outputs.SetProperty("Status", "Locked_By_Other");
                }
            } else {
                if (sTimeStsfd == "N" && sOprtn == "CHECK_IN") {
                    Outputs.SetProperty("Status", "Wait_For_Time");
                    Outputs.SetProperty("TimeLimit", sExctDiff);
                    Outputs.SetProperty("RecentUser", sRcntUsr);
                } else {
                    with (sActBC) {
                        ClearToQuery();
                        NewRecord(NewAfter);
                        SetFieldValue("Object Name", sFileName);
                        SetFieldValue("Object Type", "File Movement");
                        SetFieldValue("Error Type", "CHECK_OUT");
                        SetFieldValue("Transaction Name", "File checked out");
                        SetFieldValue("Login Id", TheApplication().LoginName());
                        SetFieldValue("Status", "Locked");
                        SetFieldValue("Version", sCurVersion);
                        WriteRecord();
                        Outputs.SetProperty("Status", "Checked_Out");
                    }
                }
            }
        }
    } catch (e) {
        throw (e);
    }
    finally {
        srvBO=null;
        srvBC=null;
    }
}
