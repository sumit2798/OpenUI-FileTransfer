function undoCheckOut(Inputs, Outputs) {
    try {
     var sFileName = Inputs.GetProperty("FileName");
     var srvBO = TheApplication().GetBusObject("Server Logger BO");
     var srvBC = srvBO.GetBusComp("Server Logger BC");
     var sCurUser = TheApplication().LoginName();
     var sProceed = "Y";
     with (srvBC) {
      SetViewMode(AllView);
      ClearToQuery();
      ActivateField("Status");
      ActivateField("Object Name");
      ActivateField("Login Id");
      SetSearchExpr("[Status] = 'Locked' AND [Login Id] = '" + sCurUser + "' AND [Object Name] = '" + sFileName + "'");
      ExecuteQuery(ForwardBackward);
      if (!FirstRecord()) {
       Outputs.SetProperty("Status", "Not_Locked");
       sProceed = "N"
      }
     }
     if (sProceed == "Y") {
      with (srvBC) {
       SetViewMode(AllView);
       ClearToQuery();
       ActivateField("Status");
       ActivateField("Object Name");
       ActivateField("Login Id");
       ActivateField("Error Type");
       ActivateField("Transaction Name");
       SetSearchExpr("[Status] = 'Locked' AND [Object Name] = '" + sFileName + "' AND [Login Id] = '" + sCurUser + "'");
       ExecuteQuery(ForwardBackward);
       if (FirstRecord()) {
        SetFieldValue("Transaction Name", "File undo checked out");
        SetFieldValue("Status", "Unlocked");
        SetFieldValue("Error Type", "CHECK_OUT to UNDO_CHECK_OUT");
        WriteRecord();
        TheApplication().RaiseErrorText("CHECK_OUT to UNDO_CHECK_OUT")
        Outputs.SetProperty("Status", "Undo_Checked_Out");
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
