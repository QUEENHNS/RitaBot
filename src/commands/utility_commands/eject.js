// -----------------
// Global variables
// -----------------

// Codebeat:disable[LOC,ABC,BLOCK_NESTING,ARITY]
const sendMessage = require("../../core/dev.send");
const oneLine = require("common-tags").oneLine;

// ------
// Eject
// ------

module.exports.eject = async function eject (data)
{

   // -------------
   // Command Code
   // -------------

   // console.log("DEBUG: Eject");

   const serverID = data.cmd.params.split(" ")[0].toLowerCase();
   const target = data.client.guilds.cache.get(serverID);

   data.color = "warn";
   data.text = `\`\`\`${serverID} - Server connection terminated\`\`\``;
   if (!target)
   {

      // ----------------
      // Already ejected
      // ----------------

      data.color = "info";
      data.text = oneLine`\`\`\`${serverID} Server has already been ejected.\n\`\`\``;
      return sendMessage(data);

   }
   else if (target.name)
   {

      const writeErr = `Rita has been removed from ${target.name} for Abuse. Continued abuse will result in Blacklisting`;

      // ----------------------
      // Send message to owner
      // ----------------------

      target.owner.
         send(writeErr).
         catch((err) => console.log(
            "error",
            err,
            "warning",
            target.name
         ));
      // console.log(`DEBUG: ${serverID}`);
      await target.leave();

   }
   else
   {

      // --------------------------------
      // Unable to locate server details
      // --------------------------------

      data.color = "warn";
      data.text = oneLine`\`\`\`${serverID} - ${target.name}\nUnable to warn Owner, Server connection terminated\`\`\``;
      await target.leave();
      return sendMessage(data);

   }

   // -------------
   // Send message
   // -------------

   return sendMessage(data);

};
