<?xml version="1.0" encoding="utf-8"?>
<PBProfile>
  <If Condition="SecondaryBot.Name != &quot;Combat Bot&quot;" IgnoreCanRun="True">
    <ChangeBot BotName="Combat Bot" />
  </If>
  <Setting DefaultValue="True" Type="Boolean" Name="Post to the Auction House" Summary="This setting toggles posting items from your inventory to the auction house" Category="Misc" Global="False" Hidden="False" />
  <Setting DefaultValue="True" Type="Boolean" Name="Cancel Undercut Auctions" Summary="This setting toggles canceling your undercut auctions from the auction house" Category="Misc" Global="False" Hidden="False" />
  <Setting DefaultValue="True" Type="Boolean" Name="Buy from the Auction House" Summary="This setting toggles buying items from the auction house" Category="Misc" Global="False" Hidden="False" />
  <Setting DefaultValue="True" Type="Boolean" Name="Wait Timer" Summary="This setting toggles waiting for a randomized time between Wait Timer Min and Wait Timer Max after a full cylce" Category="Misc" Global="False" Hidden="False" />
  <Setting DefaultValue="60" Type="Int32" Name="Wait Timer Min" Summary="This settings value is the minimum possible time (seconds) used when wait timer is enabled" Category="Misc" Global="False" Hidden="False" />
  <Setting DefaultValue="300" Type="Int32" Name="Wait Timer Max" Summary="This settings value is the maximum possible time (seconds) used when wait timer is enabled" Category="Misc" Global="False" Hidden="False" />
  <Setting DefaultValue="5000" Type="Int32" Name="Buyout Threshold" Summary="This setting acts as the minimum possible value (gold) you will use to buy auctions from the auction house" Category="Misc" Global="False" Hidden="False" />
  <Setting DefaultValue="False" Type="Boolean" Name="HBRelog" Summary="This setting will skip the current task of HBRelog after a full auction cycle" Category="Misc" Global="False" Hidden="False" />
  <Setting DefaultValue="" Type="String" Name="Scribe" Summary="This setting will send your herbs to this toon" Category="Alts" Global="False" Hidden="False" />
  <Setting DefaultValue="" Type="String" Name="Alchemist" Summary="This setting will send your herbs to this toon" Category="Alts" Global="False" Hidden="False" />
  <Setting DefaultValue="" Type="String" Name="Jewelcrafter" Summary="This setting will send your ore and uncut gems to this toon" Category="Alts" Global="False" Hidden="False" />
  <Setting DefaultValue="" Type="String" Name="Enchanter" Summary="This setting will send your enchanting materials to this toon" Category="Alts" Global="False" Hidden="False" />
  <Setting DefaultValue="" Type="String" Name="Leatherworker" Summary="This setting will send your leather to this toon" Category="Alts" Global="False" Hidden="False" />
  <Setting DefaultValue="False" Type="Boolean" Name="Check Mail" Summary="This setting toggles checking the mailbox for new mail" Category="Mail" Global="False" Hidden="False" />
  <Setting DefaultValue="1" Type="Int32" Name="Mail Counter" Summary="This setting will check the mailbox after this many post cycles" Category="Mail" Global="False" Hidden="False" />
  <Setting DefaultValue="False" Type="Boolean" Name="Send C.O.D" Summary="This setting toggles sending cash on delivery mail" Category="Mail" Global="False" Hidden="False" />
  <Setting DefaultValue="recipient1, recipient2, recipient3" Type="String" Name="Recipents" Summary="This setting will send your cash on delivery mail to these people" Category="Mail" Global="False" Hidden="False" />
  <Setting DefaultValue="20, 60, 100" Type="String" Name="Prices" Summary="This setting will send your cash on delivery mail for these prices per stack" Category="Mail" Global="False" Hidden="False" />
  <Setting DefaultValue="52555, 72094, 72103" Type="String" Name="ItemIds" Summary="This setting will send these items as your cash on delivery mail" Category="Mail" Global="False" Hidden="False" />
  <Setting DefaultValue="False" Type="Boolean" Name="Deposit to Guild Bank" Summary="Deposits items to the guild bank" Category="Bank" Global="False" Hidden="False" />
  <Setting DefaultValue="True" Type="Boolean" Name="Deposit to Personal Bank" Summary="Deposits items to your personal bank" Category="Bank" Global="False" Hidden="False" />
  <Setting DefaultValue="False" Type="Boolean" Name="Withdraw from Guild Bank" Summary="Withdraws items the guild bank (Requires Datastore WoW Addon)." Category="Bank" Global="False" Hidden="False" />
  <Setting DefaultValue="True" Type="Boolean" Name="Withdraw from Personal Bank" Summary="Withdraws from your personal bank." Category="Bank" Global="False" Hidden="False" />
  <Setting DefaultValue="10000" Type="Int64" Name="Deposit Gold Amount" Summary="Deposits all gold except this amount." Category="Bank" Global="False" Hidden="False" />
  <Setting DefaultValue="False" Type="Boolean" Name="Deposit Gold to Guild Bank" Summary="Allows the option to deposit gold in to the Guild Bank" Category="Bank" Global="False" Hidden="False" />
  <Setting DefaultValue="" Type="String" Name="Trade Chat 1" Summary="This setting will type this message into trade chat." Category="Trade" Global="False" Hidden="False" />
  <Setting DefaultValue="" Type="String" Name="Trade Chat 2" Summary="This setting will type this message into trade chat." Category="Trade" Global="False" Hidden="False" />
  <Setting DefaultValue="" Type="String" Name="Trade Chat 3" Summary="This setting will type this message into trade chat." Category="Trade" Global="False" Hidden="False" />
  <Setting DefaultValue="" Type="String" Name="DND Message" Summary="This setting will set you to DND with this message." Category="Trade" Global="False" Hidden="False" />
  <Define Code="string[] SplitString(string recipentsString){string[] recipents = recipentsString.Split(','); for (int i=0; i&lt;recipents.Length; i++){recipents[i] = recipents[i].Trim();} return recipents;}" />
  <Define Code="string[] Recipients{get{return SplitString((string)Settings[&quot;Recipents&quot;]); }}" />
  <Define Code="int[] ItemIds{get {string[] idStrings = SplitString((string) Settings[&quot;ItemIds&quot;]); int[] itemIds = new int[idStrings.Length];  for (int i = 0; i &lt; idStrings.Length; i++) {itemIds[i] = Int32.Parse(idStrings[i]);} return itemIds;}}" />
  <Define Code="int[] Prices{get {string[] priceStrings = SplitString((string) Settings[&quot;Prices&quot;]); int[] prices = new int[priceStrings.Length]; for (int i = 0; i &lt; priceStrings.Length; i++) {prices[i] = Int32.Parse(priceStrings[i]);} return prices;}}" />
  <Define Code="int StackSize(uint itemId){return Lua.GetReturnVal&lt;int&gt;(&quot;return GetItemInfo(&quot;+itemId+&quot;)&quot;, 7);}" />
  <Define Code="void CodHelper(string recipent, int itemId, int price, int amount, bool fullStacks){Lua.DoString(&quot;local id = {0} local stackPrice = {1} local recipent = \&quot;{2}\&quot; local amount = {3} local fullSize = {4} local _,_,_,_,_,_,_,stackSize=GetItemInfo(id) local j=0 local i=0 for b=0,4 do for s=1,GetContainerNumSlots(b) do local n=GetContainerItemLink(b,s) if n then if n:find(id) and i&lt;amount then _,c=GetContainerItemInfo(b,s) if fullSize then if c==stackSize then j=j+c UseContainerItem(b,s) i=i+1 end else j=j+c UseContainerItem(b,s) i=i+1 end end end end end local codprice=j*(stackPrice/stackSize) local header,_=GetSendMailItem(1) SetSendMailCOD(codprice*10000) SendMail(recipent,header,\&quot;\&quot;)&quot;, itemId, price, recipent, amount, fullStacks);}" />
  <Define Code="void Cod(string recipent, int itemId, int price, int amount, bool fullStacks){int amountLeft = amount; int amountToSend; while (amountLeft &gt; 0){if (amountLeft &gt;= 12){amountToSend = 12;} else {amountToSend = amountLeft;} CodHelper(recipent, itemId, price, amountToSend, fullStacks);  amountLeft -= amountToSend; Thread.Sleep(1500);}}" />
  <Define Code="void SendCod(string[] recipents, int[] itemIds, int[] prices, bool fullStacks){if (recipents.Length == 0) return; for (int i = 0; i &lt; recipents.Length; i++){uint itemId = (uint)itemIds[i]; int stackSize = StackSize(itemId); int amount = (int)Math.Ceiling((double)InBagItemCount(itemId) / stackSize); AHBuddyLog(&quot;Mailing {0} stacks of {1} to {2} for {3} gold per stack.&quot;, amount, itemId, recipents[i], prices[i]); Cod(recipents[i], (int)itemId, prices[i], amount, fullStacks);}}" />
  <Define Code="void AHBuddyLog(string fmt,params object[] args){Log(Colors.Crimson,&quot;AHBuddy: &quot;,Colors.BlanchedAlmond,fmt,args);}" />
  <Define Code="void ErrLog(string fmt,params object[] args){Log(Colors.Crimson,&quot;AHBuddy: &quot;,Colors.Red,fmt,args);}" />
  <Define Code="void DebugLog(string fmt,params object[] args){Logging.WriteDiagnostic(&quot;[AHBUDDY DEBUG] &quot; + fmt,args);}" />
  <Define Code="void OnBotStopped(EventArgs args) {Log(Colors.Crimson,&quot;AHBuddy: &quot;,Colors.BlanchedAlmond,&quot;Gold {0} this session: {1}&quot;, (long)Me.Copper &gt;= money? &quot;earnt&quot;:&quot;lost&quot;, PrettyMoney((long)Me.Copper - money &gt;= 0? (long)Me.Copper - money:money - (long)Me.Copper));BotEvents.OnBotStopped -= OnBotStopped;}" />
  <Define Code="string PrettyTime(TimeSpan duration, bool microwaveTime = true, bool truncateToSeconds = true){string format = string.Empty;if (truncateToSeconds){ duration = TimeSpan.FromSeconds((int)duration.TotalSeconds); }if ((int)duration.TotalMilliseconds == 0){ return &quot;0s&quot;; }if (duration.TotalMinutes &gt;= 100){ format = &quot;{0}h{1:D2}m{2:D2}s&quot;; }else if (duration.TotalSeconds &gt;= 100){ format = &quot;{4}m{2:D2}s&quot;; }else{if (!microwaveTime){ format = &quot;{4}m{2:D2}s&quot;; }else if (duration.Seconds &gt; 0){ format = &quot;{5}s&quot;; }else{ format = &quot;0.{3:D3}s&quot;; }}return string.Format(format, duration.Hours, duration.Minutes, duration.Seconds, duration.Milliseconds,(int)duration.TotalMinutes, (int)duration.TotalSeconds);}" />
  <Define Code="string PrettyMoney(long totalCopper){long moneyCopper = totalCopper % 100; totalCopper /= 100; long moneySilver = totalCopper % 100; totalCopper /= 100; long moneyGold = totalCopper; string formatString = (moneyGold &gt; 0) ? &quot;{0}g {1:D2}s {2:D2}c&quot; : (moneySilver &gt; 0) ? &quot;{1}s {2:D2}c&quot; : &quot;{2}c&quot;; return string.Format(formatString, moneyGold, moneySilver, moneyCopper);}" />
  <Define Code="uint InBagItemCount(uint id){try{return(uint)StyxWoW.Me.BagItems.Sum(i =&gt; i != null &amp;&amp; i.IsValid &amp;&amp; i.Entry == id ? i.StackCount : 0);}catch (Exception ex){ErrLog(&quot;Error: {0}&quot;, ex);return 0;}}" />
  <Define Code="Styx.Common.Helpers.WaitTimer timer;" />
  <Define Code="int WaitTimervar = new Random().Next((Int32)Settings[&quot;Wait Timer Min&quot;], (Int32)Settings[&quot;Wait Timer Max&quot;]);" />
  <Define Code="bool mailrunonce = true;" />
  <Define Code="int mailCounter = 1;" />
  <Define Code="uint zoneidvar;" />
  <Define Code="string zonenamevar;" />
  <Define Code="string subzonenamevar;" />
  <Define Code="long money = (long)Me.Copper;" />
  <Define Code="WoWUnit objAuctioneer;" />
  <Define Code="WoWPoint Auctioneer;" />
  <Define Code="List&lt;WoWPoint&gt; locAuctioneer = new List&lt;WoWPoint&gt;();" />
  <Define Code="WoWGameObject objGBank;" />
  <Define Code="WoWPoint GBank;" />
  <Define Code="List&lt;WoWPoint&gt; locGBank = new List&lt;WoWPoint&gt;();" />
  <Define Code="Random rnd = new Random();" />
  <Define Code="int TradeChannel = Lua.GetReturnVal&lt;int&gt;(string.Format(&quot;return GetChannelName(\&quot;Trade - City\&quot;)&quot;), 0);" />
  <Define Code="string MaskName(string name){int NUM_ASTERISKS = 3; if (name.Length - NUM_ASTERISKS &lt;= 1) NUM_ASTERISKS = name.Length / 2; int asterisks = name.Length - NUM_ASTERISKS; string result = name.Substring(0, NUM_ASTERISKS); result += new string('*', asterisks); return result;}" />
  <Custom Code="zoneidvar = Me.ZoneId;" />
  <Custom Code="zonenamevar = Me.ZoneText;" />
  <Custom Code="subzonenamevar = Me.SubZoneText;" />
  <Custom Code="Log(Colors.Orange,&quot;Datastore Addon: &quot;,Colors.OrangeRed,&quot;{0}&quot;,HasDataStoreAddon? &quot;Enabled&quot;:&quot;Disabled&quot;);" />
  <Custom Code="Log(Colors.Orange,&quot;Check Mail: &quot;,Colors.OrangeRed,&quot;{0}&quot;,(bool)Settings[&quot;Check Mail&quot;]? &quot;Enabled&quot;:&quot;Disabled&quot;);" />
  <Custom Code="Log(Colors.Orange,&quot;Post to the Auction House: &quot;,Colors.OrangeRed,&quot;{0}&quot;,(bool)Settings[&quot;Post to the Auction House&quot;]? &quot;Enabled&quot;:&quot;Disabled&quot;);" />
  <Custom Code="Log(Colors.Orange,&quot;Cancel Undercut Auctions: &quot;,Colors.OrangeRed,&quot;{0}&quot;,(bool)Settings[&quot;Cancel Undercut Auctions&quot;]? &quot;Enabled&quot;:&quot;Disabled&quot;);" />
  <Custom Code="Log(Colors.Orange,&quot;Buy from the Auction House: &quot;,Colors.OrangeRed,&quot;{0}&quot;,(bool)Settings[&quot;Buy from the Auction House&quot;]? &quot;Enabled&quot;:&quot;Disabled&quot;);" />
  <Custom Code="Log(Colors.Orange,&quot;HBRelog: &quot;,Colors.OrangeRed,&quot;{0}&quot;,HBRelog.IsConnected &amp;&amp; (bool)Settings[&quot;HBRelog&quot;]? &quot;Enabled&quot;:&quot;Disabled&quot;);" />
  <If Condition="(bool)Settings[&quot;Buy from the Auction House&quot;]" IgnoreCanRun="True">
    <Custom Code="Log(Colors.Orange,&quot;Buyout Threshold: &quot;,Colors.OrangeRed,&quot;{0} Gold&quot;, (int)Settings[&quot;Buyout Threshold&quot;]);" />
  </If>
  <Custom Code="Log(Colors.Orange,&quot;Wait Timer: &quot;,Colors.OrangeRed,&quot;{0}{1}{2}{3}&quot;,(bool)Settings[&quot;Wait Timer&quot;]? Settings[&quot;Wait Timer Min&quot;]:&quot;Disabled&quot;, (bool)Settings[&quot;Wait Timer&quot;]? &quot; - &quot;:string.Empty, (bool)Settings[&quot;Wait Timer&quot;]? Settings[&quot;Wait Timer Max&quot;]:string.Empty, (bool)Settings[&quot;Wait Timer&quot;]? &quot; seconds &quot;:string.Empty);" />
  <Custom Code="Log(Colors.Orange,&quot;Deposit Gold Threshold: &quot;,Colors.OrangeRed,&quot;{0}&quot;,(bool)Settings[&quot;Deposit Gold to Guild Bank&quot;]? PrettyMoney((long)Settings[&quot;Deposit Gold Amount&quot;] * 10000):&quot;Disabled&quot;);" />
  <Custom Code="Log(Colors.Orange,&quot;Current Gold: &quot;,Colors.OrangeRed,&quot;{0}&quot;,PrettyMoney((long)Me.Copper));" />
  <If Condition="!string.IsNullOrWhiteSpace((string)Settings[&quot;Scribe&quot;])" IgnoreCanRun="True">
    <Custom Code="Log(Colors.Orange,&quot;Scribe: &quot;,Colors.OrangeRed,&quot;{0}&quot;,MaskName((string)Settings[&quot;Scribe&quot;]));" />
  </If>
  <If Condition="!string.IsNullOrWhiteSpace((string)Settings[&quot;Alchemist&quot;])" IgnoreCanRun="True">
    <Custom Code="Log(Colors.Orange,&quot;Alchemist: &quot;,Colors.OrangeRed,&quot;{0}&quot;,MaskName((string)Settings[&quot;Alchemist&quot;]));" />
  </If>
  <If Condition="!string.IsNullOrWhiteSpace((string)Settings[&quot;Leatherworker&quot;])" IgnoreCanRun="True">
    <Custom Code="Log(Colors.Orange,&quot;Leatherworker: &quot;,Colors.OrangeRed,&quot;{0}&quot;,MaskName((string)Settings[&quot;Leatherworker&quot;]));" />
  </If>
  <If Condition="!string.IsNullOrWhiteSpace((string)Settings[&quot;Jewelcrafter&quot;])" IgnoreCanRun="True">
    <Custom Code="Log(Colors.Orange,&quot;Jewelcrafter: &quot;,Colors.OrangeRed,&quot;{0}&quot;,MaskName((string)Settings[&quot;Jewelcrafter&quot;]));" />
  </If>
  <If Condition="!string.IsNullOrWhiteSpace((string)Settings[&quot;Enchanter&quot;])" IgnoreCanRun="True">
    <Custom Code="Log(Colors.Orange,&quot;Enchanter: &quot;,Colors.OrangeRed,&quot;{0}&quot;,MaskName((string)Settings[&quot;Enchanter&quot;]));" />
  </If>
  <Custom Code="DebugLog(&quot;HBRelog: {0}&quot;,HBRelog.IsConnected? &quot;Enabled&quot;:&quot;Disabled&quot;);" />
  <Custom Code="DebugLog(&quot;HBRelog skip task: {0}&quot;,(bool)Settings[&quot;HBRelog&quot;]? &quot;Enabled&quot;:&quot;Disabled&quot;);" />
  <Custom Code="DebugLog(&quot;Current Zone: {0}{1}{2} ({3})&quot;,zonenamevar, subzonenamevar != string.Empty? &quot; - &quot;:string.Empty, subzonenamevar != string.Empty? subzonenamevar:string.Empty, zoneidvar);" />
  <Custom Code="Log(Colors.PowderBlue,&quot;For automatic prices PM me on the buddy forum&quot;);" />
  <Custom Code="Log(Colors.PowderBlue,&quot;http://www.thebuddyforum.com/private.php?do=newpm&amp;u=122483&quot;);" />
  <Custom Code="BotEvents.OnBotStopped += OnBotStopped;" />
  <While PulseSecondaryBot="True" Condition="true" IgnoreCanRun="True">
    <CallSubRoutine SubRoutineName="GetMail" />
    <CallSubRoutine SubRoutineName="DepositBank" />
    <CallSubRoutine SubRoutineName="WithdrawBank" />
    <CallSubRoutine SubRoutineName="SendMail" />
    <CallSubRoutine SubRoutineName="CancelFromAH" />
    <CallSubRoutine SubRoutineName="GetMail" />
    <CallSubRoutine SubRoutineName="BuyFromAH" />
    <CallSubRoutine SubRoutineName="GetMail" />
    <CallSubRoutine SubRoutineName="DepositGold" />
    <CallSubRoutine SubRoutineName="DepositBank" />
    <CallSubRoutine SubRoutineName="WithdrawBank" />
    <CallSubRoutine SubRoutineName="SendMail" />
    <CallSubRoutine SubRoutineName="PostToAH" />
    <CallSubRoutine SubRoutineName="TradeAdvertisement" />
    <CallSubRoutine SubRoutineName="WaitTimer" />
    <CallSubRoutine SubRoutineName="HBRelog" />
  </While>
  <SubRoutine SubRoutineName="BuyFromAH">
    <If Condition="(bool)Settings[&quot;Buy from the Auction House&quot;] &amp;&amp; (int)Me.Gold &gt;= (int)Settings[&quot;Buyout Threshold&quot;]" IgnoreCanRun="True">
      <CallSubRoutine SubRoutineName="GoToAH" />
      <Custom Code="AHBuddyLog(&quot;Scanning for auctions to buy.&quot;);" />
      <If Condition="(int)Me.Gold &gt;= (int)Settings[&quot;Buyout Threshold&quot;]" IgnoreCanRun="False">
        <% for(var i=0,iLen=items.length;i<iLen;i++) { %>
        <% var item = items[i]; %>
        <BuyItemFromAH ItemListType="Item" ItemID="<%= item.item_id %>" MaxBuyout="<%= item.buy_buyout %>" Amount="<%= item.buy_amount %>" BuyAdditively="<%= item.buy_additive %>" AutoFindAh="True" BidOnItem="False" Location="0,0,0" />
        <% } %>
      </If>
      <If Condition="(int)Me.Gold &lt; (int)Settings[&quot;Buyout Threshold&quot;]" IgnoreCanRun="True">
        <Custom Code="ErrLog(&quot;Requires atleast {0} Gold to buy from the auction house.&quot;,(int)Settings[&quot;Buyout Threshold&quot;]);" />
      </If>
    </If>
  </SubRoutine>
  <SubRoutine SubRoutineName="PostToAH">
    <If Condition="(bool)Settings[&quot;Post to the Auction House&quot;]" IgnoreCanRun="True">
      <Custom Code="AHBuddyLog(&quot;Posting items to the AH.&quot;);" />
      <CallSubRoutine SubRoutineName="GoToAH" />
      <StackItems />
      <% for(var i=0,iLen=items.length;i<iLen;i++) { %>
        <% var item = items[i]; %>
        <SellItemOnAH Category="None" SubCategoryType="" SubCategory="None" UseCategory="False" RunTime="<%= item.sell_run_time %>" AmountType="Amount" ItemID="<%= item.item_id %>" MinBuyout="<%= item.sell_min_buyout %>" MaxBuyout="<%= item.sell_max_buyout %>" StackSize="<%= item.sell_stack_size %>" IgnoreStackSizeBelow="<%= item.sell_ignore_stacks_below %>" Amount="<%= item.sell_amount %>" BidPrecent="<%= item.sell_bid_percent %>" UndercutPrecent="<%= item.sell_undercut_percent %>" AutoFindAh="True" PostPartialStacks="False" PostIfBelowMinBuyout="False" Location="0,0,0" />
        <% } %>
      <Custom Code="mailCounter++;" />
    </If>
  </SubRoutine>
  <SubRoutine SubRoutineName="CancelFromAH">
    <If Condition="(bool)Settings[&quot;Cancel Undercut Auctions&quot;]" IgnoreCanRun="True">
      <Custom Code="AHBuddyLog(&quot;Checking for undercut auctions.&quot;);" />
      <CallSubRoutine SubRoutineName="GoToAH" />
      <CancelAuction UseCategory="False" Category="TradeGoods" SubCategory="None" SubCategoryType="WoWItemTradeGoodsClass" ItemID="0" AutoFindAh="True" MinBuyout="0g0s0c" Location="0,0,0" IgnoreStackSizeBelow="1" />
    </If>
  </SubRoutine>
  <SubRoutine SubRoutineName="DepositBank">
    <StackItems />
    <!--
    <If Condition="((bool)Settings[&quot;Deposit to Guild Bank&quot;])" IgnoreCanRun="True">
      <If Condition="(InBagItemCount(72234) + OnAhCount(72234)) &gt; 100" IgnoreCanRun="True">
        <PutItemInBank Category="TradeGoods" SubCategoryType="WoWItemTradeGoodsClass" SubCategory="None" Deposit="Amount" UseCategory="False" Bank="Guild" ItemID="72234" GuildTab="0" NpcEntry="0" Amount="(InBagItemCount(72234) + OnAhCount(72234)) - 100" AutoFindBank="True" Location="0,0,0" />
      </If>
    </If>
    -->
    <If Condition="((bool)Settings[&quot;Deposit to Personal Bank&quot;])" IgnoreCanRun="True">
      <% for(var i=0,iLen=items.length;i<iLen;i++) { %>
        <% var item = items[i]; %>
      <If Condition="(InBagItemCount(<%= item.item_id %>) + OnAhCount(<%= item.item_id %>)) &gt; <%= item.personal_deposit_threshold %>" IgnoreCanRun="True">
        <PutItemInBank Category="None" SubCategoryType="None" SubCategory="None" Deposit="Amount" UseCategory="False" Bank="Personal" ItemID="<%= item.item_id %>" GuildTab="0" NpcEntry="0" Amount="(InBagItemCount(<%= item.item_id %>) + OnAhCount(<%= item.item_id %>)) - <%= item.personal_deposit_threshold %>" AutoFindBank="True" Location="0,0,0" />
      </If>
      <% } %>
    </If>
  </SubRoutine>
  <SubRoutine SubRoutineName="WithdrawBank">
    <StackItems />
    <!--
    <If Condition="((bool)Settings[&quot;Withdraw from Guild Bank&quot;]) &amp;&amp; !Me.NormalBagsFull" IgnoreCanRun="True">
      <If Condition="(InBagItemCount(118632) + OnAhCount(118632)) &lt; 200 &amp;&amp; InGBankCount(118632) &gt; 0" IgnoreCanRun="True">
        <GetItemfromBank Category="TradeGoods" SubCategoryType="WoWItemTradeGoodsClass" SubCategory="None" Withdraw="Amount" Bank="Guild" MinFreeBagSlots="0" GetItemfromBankType="SpecificItem" ItemID="118632" NpcEntry="0" Amount="200 - OnAhCount(118632)" AutoFindBank="True" WithdrawAdditively="False" Location="0,0,0" />
      </If>
    </If>
  -->
    <If Condition="((bool)Settings[&quot;Withdraw from Personal Bank&quot;]) &amp;&amp; !Me.NormalBagsFull" IgnoreCanRun="True">
      <% for(var i=0,iLen=items.length;i<iLen;i++) { %>
        <% var item = items[i]; %>
      <If Condition="(InBagItemCount(<%= item.item_id %>) + OnAhCount(<%= item.item_id %>)) &lt; <%= item.personal_withdraw_threshold %> &amp;&amp; InBankCount(<%= item.item_id %>) &gt; 0" IgnoreCanRun="True">
        <GetItemfromBank Category="None" SubCategoryType="None" SubCategory="None" Withdraw="Amount" Bank="Personal" MinFreeBagSlots="0" GetItemfromBankType="SpecificItem" ItemID="<%= item.item_id %>" NpcEntry="0" Amount="200 - OnAhCount(<%= item.item_id %>)" AutoFindBank="True" WithdrawAdditively="False" Location="0,0,0" />
      </If>
      <% } %>
    </If>
  </SubRoutine>
  <SubRoutine SubRoutineName="DepositGold">
    <If Condition="(bool)Settings[&quot;Deposit Gold to Guild Bank&quot;] &amp;&amp; Convert.ToInt64(Me.Gold) &gt; Convert.ToInt64(Settings[&quot;Deposit Gold Amount&quot;])" IgnoreCanRun="True">
      <Custom Code="AHBuddyLog(&quot;Depositing {0} to the Guild Bank.&quot;,PrettyMoney(Convert.ToInt64(Me.Copper) - Convert.ToInt64(Settings[&quot;Deposit Gold Amount&quot;]) * 10000));" />
      <If Condition="Styx.CommonBot.SpellManager.CanCast(83958) &amp;&amp; Me.GetReputationLevelWith(1168) &gt;= Styx.WoWUnitReaction.Friendly" IgnoreCanRun="True">
        <CastSpell RepeatType="Specific" Repeat="1" Entry="83958" CastOnItem="False" ItemType="Chest" ItemId="0" />
        <Wait Condition="ObjectManager.GetObjectsOfType&lt;WoWGameObject&gt;().Where(go =&gt; go.SubType == WoWGameObjectType.GuildBank &amp;&amp; go.CreatedByGuid == Me.Guid).FirstOrDefault() != null" Timeout="5000" />
      </If>
      <If Condition="ObjectManager.GetObjectsOfType&lt;WoWGameObject&gt;().Where(go =&gt; go.SubType == WoWGameObjectType.GuildBank &amp;&amp; go.CreatedByGuid == Me.Guid).FirstOrDefault() == null" IgnoreCanRun="True">
        <CallSubRoutine SubRoutineName="NearestGBank" />
        <While PulseSecondaryBot="True" Condition="DistanceTo(GBank) &gt; 5" IgnoreCanRun="True">
          <Custom Code="MoveTo(GBank);" />
        </While>
      </If>
      <If Condition="Me.IsMoving" IgnoreCanRun="True">
        <Custom Code="WoWMovement.MoveStop();" />
      </If>
      <Wait Condition="!Me.IsMoving" Timeout="3000" />
      <If Condition="ObjectManager.GetObjectsOfType&lt;WoWGameObject&gt;().Where(go =&gt; go.SubType == WoWGameObjectType.GuildBank &amp;&amp; (go.CreatedByGuid == WoWGuid.Empty || go.CreatedByGuid == Me.Guid)).OrderBy(go =&gt; go.Distance).FirstOrDefault().WithinInteractRange" IgnoreCanRun="True">
        <Custom Code="ObjectManager.GetObjectsOfType&lt;WoWGameObject&gt;().Where(go =&gt; go.SubType == WoWGameObjectType.GuildBank &amp;&amp; (go.CreatedByGuid == WoWGuid.Empty || go.CreatedByGuid == Me.Guid)).OrderBy(go =&gt; go.Distance).FirstOrDefault().Interact();" />
        <Wait Condition="false" Timeout="1500" />
        <Custom Code="Lua.DoString(&quot;local goldToKeep={0}*10000 local depositAmount=(GetMoney()-goldToKeep) if depositAmount &gt; 0 then DepositGuildBankMoney(depositAmount) end&quot;,Settings[&quot;Deposit Gold Amount&quot;]);" />
      </If>
    </If>
  </SubRoutine>
  <SubRoutine SubRoutineName="NearestGBank">
    <Custom Code="GBank = WoWPoint.Zero;" />
    <!--Check Object Manager for Guild Bank-->
    <Custom Code="objGBank = ObjectManager.GetObjectsOfType&lt;WoWGameObject&gt;().Where(go =&gt; go.SubType == WoWGameObjectType.GuildBank &amp;&amp; (go.CreatedByGuid == WoWGuid.Empty || go.CreatedByGuid == Me.Guid)).OrderBy(go =&gt; go.Distance).FirstOrDefault();" />
    <If Condition="objGBank != null &amp;&amp; GBank == WoWPoint.Zero" IgnoreCanRun="True">
      <Custom Code="GBank = objGBank.Location;" />
    </If>
    <!--Use static location for Guild Bank-->
    <If Condition="GBank == WoWPoint.Zero" IgnoreCanRun="True">
      <Custom Code="locGBank.Clear();" />
      <!--Eastern Kingdoms-->
      <If Condition="Me.MapId == 0" IgnoreCanRun="True">
        <!--Undercity-->
        <If Condition="Me.ZoneId == 1497" IgnoreCanRun="True">
          <!--Trade Quarter Guild Bank #1-->
          <Custom Code="locGBank.Add(new WoWPoint(1587.67, 248.6573, -51.2757));" />
          <!--Trade Quarter Guild Bank #2-->
          <Custom Code="locGBank.Add(new WoWPoint(1587.577, 232.0571, -51.27575));" />
          <!--Trade Quarter Guild Bank #3-->
          <Custom Code="locGBank.Add(new WoWPoint(1603.5, 231.7855, -51.27944));" />
          <!--Trade Quarter Guild Bank #4-->
          <Custom Code="locGBank.Add(new WoWPoint(1603.914, 248.4631, -51.2896));" />
        </If>
        <!--Stormwind-->
        <If Condition="Me.ZoneId == 1519" IgnoreCanRun="True">
          <!--Trade District Guild Bank #1-->
          <Custom Code="locGBank.Add(new WoWPoint(-8930.066, 613.1634, 100.5469));" />
          <!--Trade District Guild Bank #2-->
          <Custom Code="locGBank.Add(new WoWPoint(-8932.419, 617.3403, 100.5469));" />
          <!--Dwarven District Guild Bank #1-->
          <Custom Code="locGBank.Add(new WoWPoint(-8303.91, 572.9791, 100.6264));" />
          <!--Dwarven District Guild Bank #2-->
          <Custom Code="locGBank.Add(new WoWPoint(-8307.614, 569.9373, 100.6264));" />
        </If>
        <!--Ironforge-->
        <If Condition="Me.ZoneId == 1537" IgnoreCanRun="True">
          <!--The Commons Guild Bank #1-->
          <Custom Code="locGBank.Add(new WoWPoint(-4905.444, -992.3433, 503.9403));" />
          <!--The Commons Guild Bank #2-->
          <Custom Code="locGBank.Add(new WoWPoint(-4887.285, -977.4463, 503.9403));" />
        </If>
      </If>
      <!--Kalimdor-->
      <If Condition="Me.MapId == 1" IgnoreCanRun="True">
        <!--Orgrimmar-->
        <If Condition="Me.ZoneId == 1637" IgnoreCanRun="True">
          <!--Valley of Strength Guild Bank #1-->
          <Custom Code="locGBank.Add(new WoWPoint(1521.702, -4365.12, 20.58293));" />
          <!--Valley of Strength Guild Bank #2-->
          <Custom Code="locGBank.Add(new WoWPoint(1529.744, -4350.308, 20.58293));" />
          <!--Valley of Honor Guild Bank #1-->
          <Custom Code="locGBank.Add(new WoWPoint(1883.676, -4690.834, 38.53533));" />
          <!--Valley of Honor Guild Bank #2-->
          <Custom Code="locGBank.Add(new WoWPoint(1884.558, -4674.004, 38.53533));" />
          <!--Valley of Wisdom Guild Bank-->
          <Custom Code="locGBank.Add(new WoWPoint(1955.01, -4212.971, 37.1079));" />
          <!--Goblin Slums Guild Bank-->
          <Custom Code="locGBank.Add(new WoWPoint(1573.34, -4176.41, 51.7114));" />
        </If>
        <!--Thunder Bluff-->
        <If Condition="Me.ZoneId == 1638" IgnoreCanRun="True">
          <!--Lower Rise Guild Bank-->
          <Custom Code="locGBank.Add(new WoWPoint(-1257.805, 64.37354, 127.6252));" />
        </If>
        <!--Darnassus-->
        <If Condition="Me.ZoneId == 1657" IgnoreCanRun="True">
          <!--Temple Gardens Guild Bank #1-->
          <Custom Code="locGBank.Add(new WoWPoint(9935.946, 2517.147, 1318.54));" />
          <!--Temple Gardens Guild Bank #2-->
          <Custom Code="locGBank.Add(new WoWPoint(9944.138, 2513.43, 1318.628));" />
        </If>
      </If>
      <!--Outlands-->
      <If Condition="Me.MapId == 530" IgnoreCanRun="True">
        <!--Silvermoon-->
        <If Condition="Me.ZoneId == 3487" IgnoreCanRun="True">
          <!--Bazaar Guild Bank #1-->
          <Custom Code="locGBank.Add(new WoWPoint(9534.723, -7223.152, 17.46914));" />
          <!--Bazaar Guild Bank #2-->
          <Custom Code="locGBank.Add(new WoWPoint(9525.154, -7223.089, 17.4742));" />
          <!--Bazaar Guild Bank #3-->
          <Custom Code="locGBank.Add(new WoWPoint(9515.661, -7223.006, 17.45572));" />
          <!--Royal Exchange Guild Bank #1-->
          <Custom Code="locGBank.Add(new WoWPoint(9810.251, -7478.577, 14.55357));" />
          <!--Royal Exchange Guild Bank #2-->
          <Custom Code="locGBank.Add(new WoWPoint(9810.221, -7488.104, 14.53273));" />
          <!--Royal Exchange Guild Bank #3-->
          <Custom Code="locGBank.Add(new WoWPoint(9810.156, -7497.593, 14.49801));" />
        </If>
        <!--The Exodar-->
        <If Condition="Me.ZoneId == 3557" IgnoreCanRun="True">
          <!--Central Hub Guild Bank #1-->
          <Custom Code="locGBank.Add(new WoWPoint(-3909.753, -11548.94, -149.9568));" />
          <!--Central Hub Guild Bank #2-->
          <Custom Code="locGBank.Add(new WoWPoint(-3904.362, -11557.96, -150.0179));" />
        </If>
        <!--Shattrath-->
        <If Condition="Me.ZoneId == 3703" IgnoreCanRun="True">
          <!--The Aldor-->
          <If Condition="Me.GetReputationLevelWith(932) &gt;= Styx.WoWUnitReaction.Neutral" IgnoreCanRun="True">
            <Custom Code="locGBank.Add(new WoWPoint(-1745.807, 5533.838, -7.926137));" />
          </If>
          <!--The Scryers-->
          <If Condition="Me.GetReputationLevelWith(934) &gt;= Styx.WoWUnitReaction.Neutral" IgnoreCanRun="True">
            <Custom Code="locGBank.Add(new WoWPoint(-1987.361, 5320.466, -6.776728));" />
          </If>
        </If>
      </If>
      <!--Dalaran-->
      <If Condition="Me.ZoneId == 4395" IgnoreCanRun="True">
        <!--Dalaran Merchant's Guild Bank #1-->
        <Custom Code="locGBank.Add(new WoWPoint(5632.507, 667.3348, 657.6534));" />
        <!--Dalaran Merchant's Guild Bank #2-->
        <Custom Code="locGBank.Add(new WoWPoint(5649.969, 707.5356, 657.6364));" />
        <!--The Bank of Dalaran Guild Bank #1-->
        <Custom Code="locGBank.Add(new WoWPoint(5974.586, 634.2855, 656.3328));" />
        <!--The Bank of Dalaran Guild Bank #2-->
        <Custom Code="locGBank.Add(new WoWPoint(5959.146, 593.5022, 656.3815));" />
        <!--Cantrips & Crows Guild Bank-->
        <Custom Code="locGBank.Add(new WoWPoint(5763.231, 729.2477, 620.0504));" />
      </If>
      <!--Pandaria-->
      <If Condition="Me.MapId == 870" IgnoreCanRun="True">
        <!--Shrine of Two Moons-->
        <If Condition="Me.ZoneId == 6141" IgnoreCanRun="True">
          <!--The Jade Vaults #1-->
          <Custom Code="locGBank.Add(new WoWPoint(1738.152, 1012.336, 487.1957));" />
          <!--The Jade Vaults #2-->
          <Custom Code="locGBank.Add(new WoWPoint(1690.879, 1005.478, 487.0187));" />
          <!--The Jade Vaults #3-->
          <Custom Code="locGBank.Add(new WoWPoint(1692.96, 991.2703, 486.9622));" />
        </If>
        <!--Shrine of Seven Stars-->
        <If Condition="Me.ZoneId == 6553" IgnoreCanRun="True">
          <!--The Imperial Exchange #1-->
          <Custom Code="locGBank.Add(new WoWPoint(780.0638, 265.6462, 520.516));" />
          <!--The Imperial Exchange #2-->
          <Custom Code="locGBank.Add(new WoWPoint(765.635, 254.9828, 520.2009));" />
          <!--The Imperial Exchange #3-->
          <Custom Code="locGBank.Add(new WoWPoint(750.6803, 244.2634, 520.2737));" />
          <!--The Imperial Exchange #4-->
          <Custom Code="locGBank.Add(new WoWPoint(735.7185, 246.5735, 520.2957));" />
          <!--The Imperial Exchange #5-->
          <Custom Code="locGBank.Add(new WoWPoint(722.3151, 265.252, 520.2957));" />
        </If>
      </If>
    </If>
    <If Condition="locGBank.Count &gt; 0" IgnoreCanRun="True">
      <Custom Code="GBank = locGBank.OrderBy(loc =&gt; loc.Distance(Me.Location)).FirstOrDefault();" />
    </If>
    <If Condition="GBank != WoWPoint.Zero" IgnoreCanRun="True">
      <Custom Code="GBank = WoWMathHelper.CalculatePointFrom(Me.Location, GBank, 4);" />
    </If>
    <If Condition="GBank == WoWPoint.Zero" IgnoreCanRun="True">
      <Custom Code="ErrLog(&quot;Can not find a Guild Bank.&quot;);" />
    </If>
  </SubRoutine>
  <SubRoutine SubRoutineName="GoToAH">
    <Custom Code="Auctioneer = WoWPoint.Zero;" />
    <!--Check Object Manager for Auctioneer-->
    <Custom Code="objAuctioneer = ObjectManager.GetObjectsOfType&lt;WoWUnit&gt;().Where(u =&gt; u.IsAuctioneer &amp;&amp; u.IsAlive &amp;&amp; u.CanSelect &amp;&amp; u.IsFriendly).OrderBy(u =&gt; u.Distance).FirstOrDefault();" />
    <If Condition="objAuctioneer != null" IgnoreCanRun="True">
      <Custom Code="Auctioneer = objAuctioneer.Location;" />
    </If>
    <!--Use static location for Auctioneer-->
    <If Condition="Auctioneer == WoWPoint.Zero" IgnoreCanRun="True">
      <Custom Code="locAuctioneer.Clear();" />
      <!--Eastern Kingdoms-->
      <If Condition="Me.MapId == 0" IgnoreCanRun="True">
        <!--Undercity-->
        <If Condition="Me.ZoneId == 1497" IgnoreCanRun="True">
          <!--Auctioneer Cain-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(1648.17, 224.1727, -56.87797));" />
          <!--Auctioneer Yarly-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(1609.71, 187.175, -56.87407));" />
          <!--Auctioneer Stockton-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(1579.11, 187.979, -56.87798));" />
          <!--Auctioneer Leeka-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(1542.401, 225.1617, -56.87341));" />
          <!--Auctioneer Epitwee-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(1542.45, 255.202, -56.87814));" />
          <!--Auctioneer Rhyker-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(1580.665, 293.0618, -56.87082));" />
          <!--Auctioneer Tricket-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(1610.679, 292.8502, -56.87786));" />
          <!--Auctioneer Naxxremis-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(1648.735, 255.379, -56.87167));" />
        </If>
        <!--Stormwind-->
        <If Condition="Me.ZoneId == 1519" IgnoreCanRun="True">
          <!--Auctioneer Chilton-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(-8815.766, 665.816, 99.4953));" />
          <!--Auctioneer Fitch-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(-8813.804, 661.0052, 99.49453));" />
          <!--Auctioneer Jaxon-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(-8811.736, 656.2274, 99.49427));" />
          <!--Auctioneer Hesse-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(-8373.77, 677.099, 98.65369));" />
          <!--Auctioneer Lauffer-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(-8368.86, 678.417, 98.65343));" />
          <!--Auctioneer Fitzgerald-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(-8363.73, 679.521, 98.65382));" />
        </If>
        <!--Ironforge-->
        <If Condition="Me.ZoneId == 1537" IgnoreCanRun="True">
          <!--Auctioneer Lympkin-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(-4967.856, -917.619, 505.0857));" />
          <!--Auctioneer Redmuse-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(-4963.188, -904.619, 505.0868));" />
          <!--Auctioneer Buckler-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(-4948.009, -901.5277, 505.0884));" />
        </If>
      </If>
      <!--Kalimdor-->
      <If Condition="Me.MapId == 1" IgnoreCanRun="True">
        <!--Orgrimmar-->
        <If Condition="Me.ZoneId == 1637" IgnoreCanRun="True">
          <!--Auctioneer Ralinza-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(1640.17, -4445.12, 18.5338));" />
          <!--Auctioneer Fazdran-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(1643.72, -4443.32, 18.533));" />
          <!--Auctioneer Drezmit-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(1637.42, -4448.21, 18.53386));" />
          <!--Auctioneer Xifa-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(1635.46, -4451.19, 18.53294));" />
          <!--Auctioneer Zilbeena-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(2066.51, -4659.04, 34.02316));" />
          <!--Auctioneer Drezbit-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(2067.2, -4662.71, 34.02346));" />
          <!--Auctioneer Kuvi-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(2068.53, -4666.77, 34.02356));" />
          <!--Auctioneer Vizput-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(2070.95, -4669.52, 34.02225));" />
          <!--Auctioneer Sowata-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(1919.82, -4231.19, 36.9682));" />
          <!--Auctioneer Fenk-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(1576.07, -4154.3, 52.46375));" />
        </If>
        <!--Thunder Bluff-->
        <If Condition="Me.ZoneId == 1638" IgnoreCanRun="True">
          <!--Auctioneer Stampi-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(-1210.214, 94.85867, 134.452));" />
          <!--Auctioneer Gullem-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(-1199.256, 110.6928, 134.8658));" />
        </If>
        <!--Darnassus-->
        <If Condition="Me.ZoneId == 1657" IgnoreCanRun="True">
          <!--Auctioneer Golothas-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(9857.01, 2343.109, 1321.587));" />
          <!--Auctioneer Tolon-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(9872.64, 2341.72, 1321.585));" />
          <!--Auctioneer Cazarez-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(9868.21, 2350.05, 1331.896));" />
          <!--Auctioneer Silva'las-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(9860.35, 2331.851, 1331.896));" />
        </If>
      </If>
      <!--Outlands-->
      <If Condition="Me.MapId == 530" IgnoreCanRun="True">
        <!--Silvermoon-->
        <If Condition="Me.ZoneId == 3487" IgnoreCanRun="True">
          <!--Auctioneer Darise-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(9655.393, -7135.51, 16.77467));" />
          <!--Auctioneer Feynna-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(9648.214, -7142.549, 16.77364));" />
          <!--Auctioneer Vynna-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(9641.823, -7135.548, 16.77466));" />
          <!--Auctioneer Jenath-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(9648.251, -7129.264, 16.77561));" />
          <!--Auctioneer Tandron-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(9693.626, -7529.281, 18.1854));" />
          <!--Auctioneer Ithillan-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(9682.83, -7524.369, 18.18032));" />
          <!--Auctioneer Caidori-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(9672.638, -7529.153, 18.1841));" />
        </If>
        <!--The Exodar-->
        <If Condition="Me.ZoneId == 3557" IgnoreCanRun="True">
          <!--Auctioneer Fanin-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(-4027.622, -11732.36, -151.9036));" />
          <!--Auctioneer Iressa-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(-4025.49, -11736, -151.8916));" />
          <!--Auctioneer Eoch-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(-4023.293, -11739.65, -151.8801));" />
        </If>
        <!--Shattrath-->
        <If Condition="Me.ZoneId == 3703" IgnoreCanRun="True">
          <!--The Aldor-->
          <If Condition="Me.GetReputationLevelWith(932) &gt;= Styx.WoWUnitReaction.Neutral" IgnoreCanRun="True">
            <If Condition="Me.IsAlliance" IgnoreCanRun="True">
              <!--Auctioneer Itoran-->
              <Custom Code="locAuctioneer.Add(new WoWPoint(-1704.781, 5468.109, -8.007601));" />
            </If>
            <If Condition="Me.IsHorde" IgnoreCanRun="True">
              <!--Auctioneer Braku-->
              <Custom Code="locAuctioneer.Add(new WoWPoint(-1712.45, 5464.109, -8.016301));" />
            </If>
          </If>
          <!--The Scryers-->
          <If Condition="Me.GetReputationLevelWith(934) &gt;= Styx.WoWUnitReaction.Neutral" IgnoreCanRun="True">
            <If Condition="Me.IsAlliance" IgnoreCanRun="True">
              <!--Auctioneer Kalaren-->
              <Custom Code="locAuctioneer.Add(new WoWPoint(-2023.694, 5390.861, -7.565136));" />
            </If>
            <If Condition="Me.IsHorde" IgnoreCanRun="True">
              <!--Auctioneer Lyrsara-->
              <Custom Code="locAuctioneer.Add(new WoWPoint(-2017.036, 5393.972, -7.573854));" />
            </If>
          </If>
        </If>
      </If>
      <!--Dalaran-->
      <If Condition="Me.ZoneId == 4395" IgnoreCanRun="True">
        <If Condition="Me.IsAlliance" IgnoreCanRun="True">
          <!--Brassbolt Mechawrench-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(5763.545, 744.684, 653.6646));" />
        </If>
        <If Condition="Me.IsHorde" IgnoreCanRun="True">
          <!--Reginald Arcfire-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(5936.877, 508.7483, 650.1801));" />
        </If>
        <!--Brassbolt Mechawrench-->
        <Custom Code="locAuctioneer.Add(new WoWPoint(5927.629, 731.5903, 643.1699));" />
      </If>
      <!--Pandaria-->
      <If Condition="Me.MapId == 870 &amp;&amp; Engineering.Level &gt; 0" IgnoreCanRun="True">
        <!--Shrine of Two Moons-->
        <If Condition="Me.ZoneId == 6141" IgnoreCanRun="True">
          <!--D.E.N.T.-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(1709.651, 915.25, 470.9343));" />
        </If>
        <!--Shrine of Seven Stars-->
        <If Condition="Me.ZoneId == 6553" IgnoreCanRun="True">
          <!--H.A.R.V.E.Y.-->
          <Custom Code="locAuctioneer.Add(new WoWPoint(808.5504, 226.8021, 503.6526));" />
        </If>
      </If>
    </If>
    <If Condition="locAuctioneer.Count &gt; 0" IgnoreCanRun="True">
      <Custom Code="Auctioneer = locAuctioneer.OrderBy(loc =&gt; loc.Distance(Me.Location)).FirstOrDefault();" />
    </If>
    <If Condition="Auctioneer == WoWPoint.Zero" IgnoreCanRun="True">
      <Custom Code="ErrLog(&quot;Can not find an Auction House.&quot;);" />
    </If>
    <If Condition="Auctioneer != WoWPoint.Zero &amp;&amp; DistanceTo(Auctioneer) &gt; 5" IgnoreCanRun="True">
      <Custom Code="Auctioneer = WoWMathHelper.CalculatePointFrom(Me.Location, Auctioneer, 3);" />
      <Custom Code="DebugLog(&quot;Moving to {0}&quot;, Auctioneer);" />
      <While PulseSecondaryBot="True" Condition="DistanceTo(Auctioneer) &gt; 3" IgnoreCanRun="True">
        <Custom Code="MoveTo(Auctioneer);" />
      </While>
      <Wait Condition="!Me.IsMoving" Timeout="500" />
      <If Condition="Me.IsMoving" IgnoreCanRun="True">
        <Custom Code="WoWMovement.MoveStop();" />
      </If>
    </If>
    <Custom Code="objAuctioneer = ObjectManager.GetObjectsOfType&lt;WoWUnit&gt;().Where(u =&gt; u.IsAuctioneer &amp;&amp; u.IsAlive &amp;&amp; u.CanSelect &amp;&amp; u.IsFriendly).OrderBy(u =&gt; u.Distance).FirstOrDefault();" />
    <If Condition="objAuctioneer != null" IgnoreCanRun="True">
      <Custom Code="DebugLog(&quot;Nearest auctioneer: {0} ({1}). {2} yards away at {3}&quot;, objAuctioneer.Name, objAuctioneer.Entry, objAuctioneer.Distance, objAuctioneer.Location);" />
      <If Condition="!Me.GotTarget || Me.CurrentTarget != objAuctioneer" IgnoreCanRun="True">
        <Custom Code="DebugLog(&quot;Targeting {0}&quot;, objAuctioneer.Name);" />
        <Custom Code="objAuctioneer.Target();" />
      </If>
      <If Condition="!AuctionFrame.Instance.IsVisible" IgnoreCanRun="True">
        <Custom Code="DebugLog(&quot;Interacting with {0}&quot;, objAuctioneer.Name);" />
        <Custom Code="objAuctioneer.Interact();" />
        <Wait Condition="AuctionFrame.Instance.IsVisible" Timeout="2000" />
      </If>
    </If>
  </SubRoutine>
  <SubRoutine SubRoutineName="GetMail">
    <If Condition="(((HasNewMail || MailCount &gt; 0) &amp;&amp; !Me.NormalBagsFull &amp;&amp; mailCounter &gt;= (Int32)Settings[&quot;Mail Counter&quot;]) || mailrunonce) &amp;&amp; (bool)Settings[&quot;Check Mail&quot;]" IgnoreCanRun="True">
      <Custom Code="AHBuddyLog(&quot;Checking for new mail.&quot;);" />
      <StackItems />
      <GetMail GetMailType="AllItems" ItemID="0" MaxCODAmount="0g0s0c" MinFreeBagSlots="0" AutoFindMailBox="True" Location="0,0,0" />
      <Custom Code="mailrunonce = false;" />
      <Custom Code="mailCounter = 1;" />
    </If>
  </SubRoutine>
  <SubRoutine SubRoutineName="SendMail">
    <StackItems />
    <If Condition="(bool)Settings[&quot;Send C.O.D&quot;]" IgnoreCanRun="True">
      <MoveTo Location="0,0,0" MoveType="NearestMailbox" Pathing="Navigator" Entry="0" />
      <Interact InteractType="GameObject" Entry="0" InteractDelay="0" GameObjectType="Mailbox" SpellFocus="Anvil" WaitForObject="True" />
      <Custom Code="Lua.DoString(&quot;MailFrameTab2:Click()&quot;);" />
      <Custom Code="SendCod(Recipients, ItemIds, Prices, false);" />
    </If>
    <!--Mail Herbs to Scribe-->
    <If Condition="!string.IsNullOrWhiteSpace((string)Settings[&quot;Scribe&quot;]) &amp;&amp; (InBagItemCount(72237) &gt; 0 || InBagItemCount(72234) &gt; 0 || InBagItemCount(79011) &gt; 0 || InBagItemCount(72235) &gt; 0 || InBagItemCount(72238) &gt; 0 || InBagItemCount(79010) &gt; 0)" IgnoreCanRun="True">
      <Custom Code="AHBuddyLog(&quot;Mailing herbs to {0}.&quot;,(string)Settings[&quot;Scribe&quot;]);" />
      <Custom Code="CharacterSettings.Instance.MailRecipient = (string)Settings[&quot;Scribe&quot;];" />
      <MailItem Category="TradeGoods" SubCategoryType="WoWItemTradeGoodsClass" SubCategory="None" Mail="All" ItemID="72234,72237,72235,79010,79011,89639" Amount="0" AutoFindMailBox="True" Location="0,0,0" ItemQuality="Uncommon" ItemSelection="IDs" />
    </If>
    <!--Mail Herbs to Alchemist-->
    <If Condition="!string.IsNullOrWhiteSpace((string)Settings[&quot;Alchemist&quot;]) &amp;&amp; (InBagItemCount(72237) &gt; 0 || InBagItemCount(72234) &gt; 0 || InBagItemCount(79011) &gt; 0 || InBagItemCount(72235) &gt; 0 || InBagItemCount(72238) &gt; 0 || InBagItemCount(79010) &gt; 0)" IgnoreCanRun="True">
      <Custom Code="AHBuddyLog(&quot;Mailing herbs to {0}.&quot;,(string)Settings[&quot;Alchemist&quot;]);" />
      <Custom Code="CharacterSettings.Instance.MailRecipient = (string)Settings[&quot;Alchemist&quot;];" />
      <MailItem Category="TradeGoods" SubCategoryType="WoWItemTradeGoodsClass" SubCategory="None" Mail="All" ItemID="72234,72237,72235,79010,79011,72238" Amount="0" AutoFindMailBox="True" Location="0,0,0" ItemQuality="Uncommon" ItemSelection="IDs" />
    </If>
    <!--Mail Ore to Jewelcrafter-->
    <If Condition="!string.IsNullOrWhiteSpace((string)Settings[&quot;Jewelcrafter&quot;]) &amp;&amp; (InBagItemCount(72092) &gt; 0 || InBagItemCount(72103) &gt; 0 || InBagItemCount(72094) &gt; 0 || InBagItemCount(72093) &gt; 0)" IgnoreCanRun="True">
      <Custom Code="AHBuddyLog(&quot;Sending ore to {0}.&quot;,(string)Settings[&quot;Jewelcrafter&quot;]);" />
      <Custom Code="CharacterSettings.Instance.MailRecipient = (string)Settings[&quot;Jewelcrafter&quot;];" />
      <MailItem Category="TradeGoods" SubCategoryType="WoWItemTradeGoodsClass" SubCategory="None" Mail="All" ItemID="72094,72103,72092,72093" Amount="0" AutoFindMailBox="True" Location="0,0,0" ItemQuality="Uncommon" ItemSelection="IDs" />
    </If>
    <!--Mail Enchanting Materials to Enchanter-->
    <If Condition="!string.IsNullOrWhiteSpace((string)Settings[&quot;Enchanter&quot;]) &amp;&amp; (InBagItemCount(74248) &gt; 0 || InBagItemCount(74247) &gt; 0 || InBagItemCount(74252) &gt; 0 || InBagItemCount(74250) &gt; 0 || InBagItemCount(74249) &gt; 0)" IgnoreCanRun="True">
      <Custom Code="AHBuddyLog(&quot;Sending enchanting materials to {0}.&quot;,(string)Settings[&quot;Enchanter&quot;]);" />
      <Custom Code="CharacterSettings.Instance.MailRecipient = (string)Settings[&quot;Enchanter&quot;];" />
      <MailItem Category="TradeGoods" SubCategoryType="WoWItemTradeGoodsClass" SubCategory="None" Mail="All" ItemID="74248,74247,74252,74250,74249" Amount="0" AutoFindMailBox="True" Location="0,0,0" ItemQuality="Uncommon" ItemSelection="IDs" />
    </If>
    <!--Mail uncut Gems to Jewelcrafter-->
    <If Condition="!string.IsNullOrWhiteSpace((string)Settings[&quot;Jewelcrafter&quot;]) &amp;&amp; (InBagItemCount(76136) &gt; 0 || InBagItemCount(76130) &gt; 0 || InBagItemCount(76134) &gt; 0 || InBagItemCount(76137) &gt; 0 || InBagItemCount(76133) &gt; 0 || InBagItemCount(76135) &gt; 0 || InBagItemCount(76131) &gt; 0 || InBagItemCount(76140) &gt; 0 || InBagItemCount(76142) &gt; 0 || InBagItemCount(76139) &gt; 0 || InBagItemCount(76138) &gt; 0 || InBagItemCount(76141) &gt; 0)" IgnoreCanRun="True">
      <Custom Code="AHBuddyLog(&quot;Sending uncut Pandarian gems to {0}.&quot;,(string)Settings[&quot;Jewelcrafter&quot;]);" />
      <Custom Code="CharacterSettings.Instance.MailRecipient = (string)Settings[&quot;Jewelcrafter&quot;];" />
      <MailItem Category="TradeGoods" SubCategoryType="WoWItemTradeGoodsClass" SubCategory="None" Mail="All" ItemID="76136,76130,76134,76137,76133,76135,76131,76140,76142,76139,76138,76141" Amount="0" AutoFindMailBox="True" Location="0,0,0" ItemQuality="Uncommon" ItemSelection="IDs" />
    </If>
    <!--Mail Leather to Leatherworker-->
    <If Condition="!string.IsNullOrWhiteSpace((string)Settings[&quot;Leatherworker&quot;]) &amp;&amp; (InBagItemCount(72163) &gt; 0 || InBagItemCount(79101) &gt; 0 || InBagItemCount(72120) &gt; 0 || InBagItemCount(72162) &gt; 0)" IgnoreCanRun="True">
      <Custom Code="AHBuddyLog(&quot;Sending leather to {0}.&quot;,(string)Settings[&quot;Leatherworker&quot;]);" />
      <Custom Code="CharacterSettings.Instance.MailRecipient = (string)Settings[&quot;Leatherworker&quot;];" />
      <MailItem Category="TradeGoods" SubCategoryType="WoWItemTradeGoodsClass" SubCategory="None" Mail="All" ItemID="72163,79101,72120,72162" Amount="0" AutoFindMailBox="True" Location="0,0,0" ItemQuality="Uncommon" ItemSelection="IDs" />
    </If>
  </SubRoutine>
  <SubRoutine SubRoutineName="TradeAdvertisement">
    <If Condition="!string.IsNullOrEmpty((string)Settings[&quot;Trade Chat 1&quot;])" IgnoreCanRun="True">
      <Custom Code="DebugLog(&quot;Typing trade message 1 into trade chat&quot;);" />
      <Custom Code="Lua.DoString(&quot;SendChatMessage(\&quot;{0}\&quot;,\&quot;CHANNEL\&quot;, nil, {1})&quot;, (string)Settings[&quot;Trade Chat 1&quot;], TradeChannel);" />
    </If>
    <If Condition="!string.IsNullOrEmpty((string)Settings[&quot;Trade Chat 2&quot;])" IgnoreCanRun="True">
      <Custom Code="DebugLog(&quot;Typing trade message 2 into trade chat&quot;);" />
      <Custom Code="Lua.DoString(&quot;SendChatMessage(\&quot;{0}\&quot;,\&quot;CHANNEL\&quot;, nil, {1})&quot;, (string)Settings[&quot;Trade Chat 2&quot;], TradeChannel);" />
    </If>
    <If Condition="!string.IsNullOrEmpty((string)Settings[&quot;Trade Chat 3&quot;])" IgnoreCanRun="True">
      <Custom Code="DebugLog(&quot;Typing trade message 3 into trade chat&quot;);" />
      <Custom Code="Lua.DoString(&quot;SendChatMessage(\&quot;{0}\&quot;,\&quot;CHANNEL\&quot;, nil, {1})&quot;, (string)Settings[&quot;Trade Chat 3&quot;], TradeChannel);" />
    </If>
    <If Condition="!string.IsNullOrWhiteSpace((string)Settings[&quot;DND Message&quot;]) &amp;&amp; !Me.IsDNDFlagged" IgnoreCanRun="True">
      <Custom Code="Lua.DoString(string.Format(&quot;RunMacroText(\&quot;/dnd {0}\&quot;)&quot;, (string)Settings[&quot;DND Message&quot;]), 0);" />
    </If>
  </SubRoutine>
  <SubRoutine SubRoutineName="HBRelog">
    <If Condition="(bool)Settings[&quot;HBRelog&quot;] &amp;&amp; HBRelog.IsConnected" IgnoreCanRun="True">
      <Custom Code="DebugLog(&quot;Skipping current HBRelog task&quot;);" />
      <Custom Code="HBRelog.SkipCurrentTask(HBRelog.CurrentProfileName);" />
    </If>
  </SubRoutine>
  <SubRoutine SubRoutineName="WaitTimer">
    <If Condition="(bool)Settings[&quot;Wait Timer&quot;]" IgnoreCanRun="True">
      <Custom Code="WaitTimervar = rnd.Next((Int32)Settings[&quot;Wait Timer Min&quot;], (Int32)Settings[&quot;Wait Timer Max&quot;]);" />
      <Custom Code="timer = new Styx.Common.Helpers.WaitTimer(TimeSpan.FromSeconds(WaitTimervar));" />
      <Custom Code="AHBuddyLog(&quot;Taking a break for {0} Seconds {1}{2}{3} &quot;, WaitTimervar, WaitTimervar &gt;= 100? &quot;(&quot;:string.Empty, WaitTimervar &gt;= 100? PrettyTime(timer.WaitTime):string.Empty, WaitTimervar &gt;= 100? &quot;)&quot;:string.Empty);" />
      <Custom Code="timer.Reset();" />
      <While PulseSecondaryBot="True" Condition="!timer.IsFinished" IgnoreCanRun="True">
        <Custom Code="TreeRoot.StatusText = string.Format(&quot;Waiting: {0} of {1}.&quot;, PrettyTime(timer.TimeLeft), PrettyTime(timer.WaitTime));" />
        <Wait Condition="false" Timeout="930" />
      </While>
      <If Condition="timer.IsFinished" IgnoreCanRun="True">
        <Custom Code="timer.Reset();" />
        <Custom Code="TreeRoot.StatusText = string.Empty;" />
      </If>
    </If>
  </SubRoutine>
</PBProfile>