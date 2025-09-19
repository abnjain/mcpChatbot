import Chatbot from "./components/Chatbot"
import "./main.css";

const App = () => {
  return (
    <div>
      <p className="userInput" >
shop - antim-fulwere-dev-2-0.myshopify.com <br />

give me order details 5783273570459 <br />

give me my order list <br />

give me my cart details <br />

give me snowboards from the shop <br />

give me red shirts from the shop <br />
    
give me international shipping policy of the shop <br />

give me return policy of the shop <br />

in my cart add product gid://shopify/ProductVariant/46338035024038 to my cart with quantity 4 <br />

in my cart update product gid://shopify/ProductVariant/46338035024038 to my cart with quantity 5 <br />

add product gid://shopify/ProductVariant/46350554988710 to the order with quantity 2 from 3 <br />
 
remove product gid://shopify/ProductVariant/46350554988710 with calculatedLineItemId gid://shopify/CalculatedLineItemId/14748425158822 from the order <br />
 
edit quantity of gid://shopify/ProductVariant/46350554988710 with calculatedLineItemId gid://shopify/CalculatedLineItemId/14748425158822 from 2 to 5 <br />
 
apply discount on my order the code is 20shipping <br />
 
accept refund on my order because of defective item <br />

give today's insights <br />

give me last weeks insights

calcualte my total profit revenue and analysis insights <br />

suggest why my sales down and how can I improve my product sales give me suggestions <br />

total number of order edits last week <br />

which city have maximum cancellation of order edits <br />

from which city I got maximum order <br />

which order edit is maximum cancelled by customer <br />


      </p>
      


      <h3 data-start="268" data-end="302"><strong data-start="272" data-end="302">1. Order-Related Questions</strong></h3>
<ul data-start="304" data-end="1318">
<li data-start="304" data-end="499">
<p data-start="306" data-end="333"><strong data-start="306" data-end="333">Order Status &amp; Tracking</strong></p>
<ul data-start="336" data-end="499">
<li data-start="336" data-end="358">
<p data-start="338" data-end="358">"Where is my order?"</p>
</li>
<li data-start="361" data-end="386">
<p data-start="363" data-end="386">"Can I track my order?"</p>
</li>
<li data-start="389" data-end="419">
<p data-start="391" data-end="419">"Has my order been shipped?"</p>
</li>
<li data-start="422" data-end="466">
<p data-start="424" data-end="466">"What&rsquo;s the tracking number for my order?"</p>
</li>
<li data-start="469" data-end="499">
<p data-start="471" data-end="499">"When will my order arrive?"</p>
</li>
</ul>
</li>
<li data-start="501" data-end="726">
<p data-start="503" data-end="526"><strong data-start="503" data-end="526">Order Modifications</strong></p>
<ul data-start="529" data-end="726">
<li data-start="529" data-end="572">
<p data-start="531" data-end="572">"Can I change my order after placing it?"</p>
</li>
<li data-start="575" data-end="635">
<p data-start="577" data-end="635">"I need to update my shipping address, how can I do that?"</p>
</li>
<li data-start="638" data-end="670">
<p data-start="640" data-end="670">"Can I add items to my order?"</p>
</li>
<li data-start="673" data-end="726">
<p data-start="675" data-end="726">"Can I modify the quantity of an item in my order?"</p>
</li>
</ul>
</li>
<li data-start="728" data-end="880">
<p data-start="730" data-end="752"><strong data-start="730" data-end="752">Order Cancellation</strong></p>
<ul data-start="755" data-end="880">
<li data-start="755" data-end="785">
<p data-start="757" data-end="785">"How can I cancel my order?"</p>
</li>
<li data-start="788" data-end="830">
<p data-start="790" data-end="830">"Can I cancel my order before it ships?"</p>
</li>
<li data-start="833" data-end="880">
<p data-start="835" data-end="880">"I want to cancel my order, can you help me?"</p>
</li>
</ul>
</li>
<li data-start="882" data-end="1103">
<p data-start="884" data-end="913"><strong data-start="884" data-end="913">Order Returns &amp; Exchanges</strong></p>
<ul data-start="916" data-end="1103">
<li data-start="916" data-end="944">
<p data-start="918" data-end="944">"How do I return an item?"</p>
</li>
<li data-start="947" data-end="974">
<p data-start="949" data-end="974">"Can I exchange my item?"</p>
</li>
<li data-start="977" data-end="1007">
<p data-start="979" data-end="1007">"What is the return policy?"</p>
</li>
<li data-start="1010" data-end="1049">
<p data-start="1012" data-end="1049">"How do I get a refund for my order?"</p>
</li>
<li data-start="1052" data-end="1103">
<p data-start="1054" data-end="1103">"I received a damaged product, what should I do?"</p>
</li>
</ul>
</li>
<li data-start="1105" data-end="1318">
<p data-start="1107" data-end="1135"><strong data-start="1107" data-end="1135">Order Payment &amp; Invoices</strong></p>
<ul data-start="1138" data-end="1318">
<li data-start="1138" data-end="1177">
<p data-start="1140" data-end="1177">"What payment methods do you accept?"</p>
</li>
<li data-start="1180" data-end="1239">
<p data-start="1182" data-end="1239">"Can I change my payment method after placing the order?"</p>
</li>
<li data-start="1242" data-end="1280">
<p data-start="1244" data-end="1280">"I need an invoice for my purchase."</p>
</li>
<li data-start="1283" data-end="1315">
<p data-start="1285" data-end="1315">"Why was my payment declined?"</p>
</li>
</ul>
</li>
</ul>
<hr data-start="1319" data-end="1322" />
<h3 data-start="1324" data-end="1350"><strong data-start="1328" data-end="1350">2. Cart &amp; Checkout</strong></h3>
<ul data-start="1352" data-end="1951">
<li data-start="1352" data-end="1525">
<p data-start="1354" data-end="1371"><strong data-start="1354" data-end="1371">Cart Overview</strong></p>
<ul data-start="1374" data-end="1525">
<li data-start="1374" data-end="1413">
<p data-start="1376" data-end="1413">"How do I view the items in my cart?"</p>
</li>
<li data-start="1416" data-end="1452">
<p data-start="1418" data-end="1452">"How do I add an item to my cart?"</p>
</li>
<li data-start="1455" data-end="1491">
<p data-start="1457" data-end="1491">"Can I remove items from my cart?"</p>
</li>
<li data-start="1494" data-end="1525">
<p data-start="1496" data-end="1525">"Can I save items for later?"</p>
</li>
</ul>
</li>
<li data-start="1527" data-end="1741">
<p data-start="1529" data-end="1549"><strong data-start="1529" data-end="1549">Checkout Process</strong></p>
<ul data-start="1552" data-end="1741">
<li data-start="1552" data-end="1586">
<p data-start="1554" data-end="1586">"How do I complete my purchase?"</p>
</li>
<li data-start="1589" data-end="1628">
<p data-start="1591" data-end="1628">"What shipping options do you offer?"</p>
</li>
<li data-start="1631" data-end="1662">
<p data-start="1633" data-end="1662">"Do you offer free shipping?"</p>
</li>
<li data-start="1665" data-end="1703">
<p data-start="1667" data-end="1703">"Can I use multiple discount codes?"</p>
</li>
<li data-start="1706" data-end="1741">
<p data-start="1708" data-end="1741">"How do I apply a discount code?"</p>
</li>
</ul>
</li>
<li data-start="1743" data-end="1951">
<p data-start="1745" data-end="1772"><strong data-start="1745" data-end="1772">Promo Codes &amp; Discounts</strong></p>
<ul data-start="1775" data-end="1951">
<li data-start="1775" data-end="1812">
<p data-start="1777" data-end="1812">"What are your current promotions?"</p>
</li>
<li data-start="1815" data-end="1850">
<p data-start="1817" data-end="1850">"How do I apply a discount code?"</p>
</li>
<li data-start="1853" data-end="1890">
<p data-start="1855" data-end="1890">"Can I use a coupon with my order?"</p>
</li>
<li data-start="1893" data-end="1951">
<p data-start="1895" data-end="1951">"Do you have any student or first-time buyer discounts?"</p>
</li>
</ul>
</li>
</ul>
<hr data-start="1953" data-end="1956" />
<h3 data-start="1958" data-end="1986"><strong data-start="1962" data-end="1986">3. Product &amp; Catalog</strong></h3>
<ul data-start="1988" data-end="2618">
<li data-start="1988" data-end="2181">
<p data-start="1990" data-end="2008"><strong data-start="1990" data-end="2008">Product Search</strong></p>
<ul data-start="2011" data-end="2181">
<li data-start="2011" data-end="2046">
<p data-start="2013" data-end="2046">"Can you help me find a product?"</p>
</li>
<li data-start="2049" data-end="2093">
<p data-start="2051" data-end="2093">"Do you have any [product name] in stock?"</p>
</li>
<li data-start="2096" data-end="2136">
<p data-start="2098" data-end="2136">"What are your most popular products?"</p>
</li>
<li data-start="2139" data-end="2181">
<p data-start="2141" data-end="2181">"Do you have a size guide for clothing?"</p>
</li>
</ul>
</li>
<li data-start="2183" data-end="2442">
<p data-start="2185" data-end="2208"><strong data-start="2185" data-end="2208">Product Information</strong></p>
<ul data-start="2211" data-end="2442">
<li data-start="2211" data-end="2261">
<p data-start="2213" data-end="2261">"What are the specifications of [product name]?"</p>
</li>
<li data-start="2264" data-end="2316">
<p data-start="2266" data-end="2316">"Is [product name] available in different colors?"</p>
</li>
<li data-start="2319" data-end="2364">
<p data-start="2321" data-end="2364">"Does [product name] come with a warranty?"</p>
</li>
<li data-start="2367" data-end="2442">
<p data-start="2369" data-end="2442">"Can I get more details about the ingredients/materials of this product?"</p>
</li>
</ul>
</li>
<li data-start="2444" data-end="2618">
<p data-start="2446" data-end="2470"><strong data-start="2446" data-end="2470">Product Availability</strong></p>
<ul data-start="2473" data-end="2618">
<li data-start="2473" data-end="2519">
<p data-start="2475" data-end="2519">"When will [product name] be back in stock?"</p>
</li>
<li data-start="2522" data-end="2577">
<p data-start="2524" data-end="2577">"Can you notify me when [product name] is available?"</p>
</li>
<li data-start="2580" data-end="2618">
<p data-start="2582" data-end="2618">"Is this item available in my area?"</p>
</li>
</ul>
</li>
</ul>
<hr data-start="2620" data-end="2623" />
<h3 data-start="2625" data-end="2653"><strong data-start="2629" data-end="2653">4. Account &amp; Profile</strong></h3>
<ul data-start="2655" data-end="3221">
<li data-start="2655" data-end="2847">
<p data-start="2657" data-end="2679"><strong data-start="2657" data-end="2679">Account Management</strong></p>
<ul data-start="2682" data-end="2847">
<li data-start="2682" data-end="2713">
<p data-start="2684" data-end="2713">"How do I create an account?"</p>
</li>
<li data-start="2716" data-end="2759">
<p data-start="2718" data-end="2759">"How do I update my profile information?"</p>
</li>
<li data-start="2762" data-end="2813">
<p data-start="2764" data-end="2813">"I forgot my password, can you help me reset it?"</p>
</li>
<li data-start="2816" data-end="2847">
<p data-start="2818" data-end="2847">"How do I delete my account?"</p>
</li>
</ul>
</li>
<li data-start="2849" data-end="3044">
<p data-start="2851" data-end="2882"><strong data-start="2851" data-end="2882">Order History &amp; Preferences</strong></p>
<ul data-start="2885" data-end="3044">
<li data-start="2885" data-end="2919">
<p data-start="2887" data-end="2919">"Can I view my previous orders?"</p>
</li>
<li data-start="2922" data-end="2958">
<p data-start="2924" data-end="2958">"How do I check my order history?"</p>
</li>
<li data-start="2961" data-end="3001">
<p data-start="2963" data-end="3001">"Can I reorder from a previous order?"</p>
</li>
<li data-start="3004" data-end="3044">
<p data-start="3006" data-end="3044">"How can I save items to my wishlist?"</p>
</li>
</ul>
</li>
<li data-start="3046" data-end="3221">
<p data-start="3048" data-end="3090"><strong data-start="3048" data-end="3090">Shipping Address &amp; Payment Information</strong></p>
<ul data-start="3093" data-end="3221">
<li data-start="3093" data-end="3133">
<p data-start="3095" data-end="3133">"How do I update my shipping address?"</p>
</li>
<li data-start="3136" data-end="3175">
<p data-start="3138" data-end="3175">"How can I update my payment method?"</p>
</li>
<li data-start="3178" data-end="3221">
<p data-start="3180" data-end="3221">"Can I save multiple shipping addresses?"</p>
</li>
</ul>
</li>
</ul>
<hr data-start="3223" data-end="3226" />
<h3 data-start="3228" data-end="3261"><strong data-start="3232" data-end="3261">5. Support &amp; Help Tickets</strong></h3>
<ul data-start="3263" data-end="3701">
<li data-start="3263" data-end="3470">
<p data-start="3265" data-end="3285"><strong data-start="3265" data-end="3285">Customer Support</strong></p>
<ul data-start="3288" data-end="3470">
<li data-start="3288" data-end="3327">
<p data-start="3290" data-end="3327">"How can I contact customer support?"</p>
</li>
<li data-start="3330" data-end="3376">
<p data-start="3332" data-end="3376">"Can you help me with a problem I&rsquo;m having?"</p>
</li>
<li data-start="3379" data-end="3410">
<p data-start="3381" data-end="3410">"Where can I find more help?"</p>
</li>
<li data-start="3413" data-end="3470">
<p data-start="3415" data-end="3470">"How long does it take to get a response from support?"</p>
</li>
</ul>
</li>
<li data-start="3472" data-end="3701">
<p data-start="3474" data-end="3501"><strong data-start="3474" data-end="3501">Support Ticket Creation</strong></p>
<ul data-start="3504" data-end="3701">
<li data-start="3504" data-end="3549">
<p data-start="3506" data-end="3549">"I want to file a complaint, can you help?"</p>
</li>
<li data-start="3552" data-end="3589">
<p data-start="3554" data-end="3589">"How do I submit a support ticket?"</p>
</li>
<li data-start="3592" data-end="3640">
<p data-start="3594" data-end="3640">"Can I track the status of my support ticket?"</p>
</li>
<li data-start="3643" data-end="3701">
<p data-start="3645" data-end="3701">"What should I do if I&rsquo;m having an issue with my order?"</p>
</li>
</ul>
</li>
</ul>
<hr data-start="3703" data-end="3706" />
<h3 data-start="3708" data-end="3738"><strong data-start="3712" data-end="3738">6. Shipping &amp; Delivery</strong></h3>
<ul data-start="3740" data-end="4238">
<li data-start="3740" data-end="3932">
<p data-start="3742" data-end="3770"><strong data-start="3742" data-end="3770">Shipping Options &amp; Costs</strong></p>
<ul data-start="3773" data-end="3932">
<li data-start="3773" data-end="3812">
<p data-start="3775" data-end="3812">"What shipping methods do you offer?"</p>
</li>
<li data-start="3815" data-end="3847">
<p data-start="3817" data-end="3847">"How much does shipping cost?"</p>
</li>
<li data-start="3850" data-end="3890">
<p data-start="3852" data-end="3890">"Do you offer international shipping?"</p>
</li>
<li data-start="3893" data-end="3932">
<p data-start="3895" data-end="3932">"How do I change my shipping method?"</p>
</li>
</ul>
</li>
<li data-start="3934" data-end="4062">
<p data-start="3936" data-end="3954"><strong data-start="3936" data-end="3954">Delivery Times</strong></p>
<ul data-start="3957" data-end="4062">
<li data-start="3957" data-end="3993">
<p data-start="3959" data-end="3993">"When will my order be delivered?"</p>
</li>
<li data-start="3996" data-end="4028">
<p data-start="3998" data-end="4028">"Can I get same-day delivery?"</p>
</li>
<li data-start="4031" data-end="4062">
<p data-start="4033" data-end="4062">"Why is my shipment delayed?"</p>
</li>
</ul>
</li>
<li data-start="4064" data-end="4238">
<p data-start="4066" data-end="4085"><strong data-start="4066" data-end="4085">Shipping Issues</strong></p>
<ul data-start="4088" data-end="4238">
<li data-start="4088" data-end="4138">
<p data-start="4090" data-end="4138">"I haven&rsquo;t received my order yet. Can you help?"</p>
</li>
<li data-start="4141" data-end="4183">
<p data-start="4143" data-end="4183">"My package was lost, what should I do?"</p>
</li>
<li data-start="4186" data-end="4238">
<p data-start="4188" data-end="4238">"Can I change my delivery address after shipping?"</p>
</li>
</ul>
</li>
</ul>
<hr data-start="4240" data-end="4243" />
<h3 data-start="4245" data-end="4281"><strong data-start="4249" data-end="4281">7. General Store Information</strong></h3>
<ul data-start="4283" data-end="4745">
<li data-start="4283" data-end="4494">
<p data-start="4285" data-end="4303"><strong data-start="4285" data-end="4303">Store Policies</strong></p>
<ul data-start="4306" data-end="4494">
<li data-start="4306" data-end="4346">
<p data-start="4308" data-end="4346">"What is your return/exchange policy?"</p>
</li>
<li data-start="4349" data-end="4377">
<p data-start="4351" data-end="4377">"Do you offer gift cards?"</p>
</li>
<li data-start="4380" data-end="4413">
<p data-start="4382" data-end="4413">"What are your business hours?"</p>
</li>
<li data-start="4416" data-end="4451">
<p data-start="4418" data-end="4451">"Can I make a purchase in-store?"</p>
</li>
<li data-start="4454" data-end="4494">
<p data-start="4456" data-end="4494">"Do you have any seasonal promotions?"</p>
</li>
</ul>
</li>
<li data-start="4496" data-end="4629">
<p data-start="4498" data-end="4517"><strong data-start="4498" data-end="4517">Store Locations</strong></p>
<ul data-start="4520" data-end="4629">
<li data-start="4520" data-end="4552">
<p data-start="4522" data-end="4552">"Where is your store located?"</p>
</li>
<li data-start="4555" data-end="4590">
<p data-start="4557" data-end="4590">"Do you have any stores near me?"</p>
</li>
<li data-start="4593" data-end="4629">
<p data-start="4595" data-end="4629">"Can I pick up my order in-store?"</p>
</li>
</ul>
</li>
<li data-start="4631" data-end="4745">
<p data-start="4633" data-end="4654"><strong data-start="4633" data-end="4654">Order Fulfillment</strong></p>
<ul data-start="4657" data-end="4745">
<li data-start="4657" data-end="4693">
<p data-start="4659" data-end="4693">"When will my order be processed?"</p>
</li>
<li data-start="4696" data-end="4742">
<p data-start="4698" data-end="4742">"How long does it take to fulfill an order?"</p>
</li>
</ul>
</li>
</ul>
<hr data-start="4746" data-end="4749" />
<h3 data-start="4751" data-end="4785"><strong data-start="4755" data-end="4785">8. Notifications &amp; Updates</strong></h3>
<ul data-start="4787" data-end="5127">
<li data-start="4787" data-end="4958">
<p data-start="4789" data-end="4812"><strong data-start="4789" data-end="4812">Order Notifications</strong></p>
<ul data-start="4815" data-end="4958">
<li data-start="4815" data-end="4858">
<p data-start="4817" data-end="4858">"Can I get notified when my order ships?"</p>
</li>
<li data-start="4861" data-end="4896">
<p data-start="4863" data-end="4896">"How do I turn on order updates?"</p>
</li>
<li data-start="4899" data-end="4958">
<p data-start="4901" data-end="4958">"Will I get a notification when my product is restocked?"</p>
</li>
</ul>
</li>
<li data-start="4960" data-end="5127">
<p data-start="4962" data-end="4987"><strong data-start="4962" data-end="4987">Subscription &amp; Offers</strong></p>
<ul data-start="4990" data-end="5127">
<li data-start="4990" data-end="5031">
<p data-start="4992" data-end="5031">"How do I sign up for your newsletter?"</p>
</li>
<li data-start="5034" data-end="5090">
<p data-start="5036" data-end="5090">"Can I receive text message updates about promotions?"</p>
</li>
<li data-start="5093" data-end="5127">
<p data-start="5095" data-end="5127">"Do you have a loyalty program?"</p>
</li>
</ul>
</li>
</ul>
<hr data-start="5129" data-end="5132" />
<h3 data-start="5134" data-end="5167"><strong data-start="5138" data-end="5167">9. Technical &amp; App Issues</strong></h3>
<ul data-start="5169" data-end="5536">
<li data-start="5169" data-end="5379">
<p data-start="5171" data-end="5185"><strong data-start="5171" data-end="5185">App Issues</strong></p>
<ul data-start="5188" data-end="5379">
<li data-start="5188" data-end="5236">
<p data-start="5190" data-end="5236">"I can&rsquo;t access my account. What should I do?"</p>
</li>
<li data-start="5239" data-end="5283">
<p data-start="5241" data-end="5283">"The website isn&rsquo;t loading, can you help?"</p>
</li>
<li data-start="5286" data-end="5336">
<p data-start="5288" data-end="5336">"I&rsquo;m having trouble checking out, what&rsquo;s wrong?"</p>
</li>
<li data-start="5339" data-end="5379">
<p data-start="5341" data-end="5379">"Why is my payment not going through?"</p>
</li>
</ul>
</li>
<li data-start="5381" data-end="5536">
<p data-start="5383" data-end="5403"><strong data-start="5383" data-end="5403">Website Features</strong></p>
<ul data-start="5406" data-end="5536">
<li data-start="5406" data-end="5447">
<p data-start="5408" data-end="5447">"Can you help me navigate the website?"</p>
</li>
<li data-start="5450" data-end="5482">
<p data-start="5452" data-end="5482">"How do I use the size guide?"</p>
</li>
<li data-start="5485" data-end="5536">
<p data-start="5487" data-end="5536">"How do I change my order once it&rsquo;s been placed?"</p>
</li>
</ul>
</li>
</ul>
<hr data-start="5538" data-end="5541" />
<h3 data-start="5543" data-end="5573"><strong data-start="5547" data-end="5573">10. Feedback &amp; Reviews</strong></h3>
<ul data-start="5575" data-end="5858">
<li data-start="5575" data-end="5753">
<p data-start="5577" data-end="5595"><strong data-start="5577" data-end="5595">Leave Feedback</strong></p>
<ul data-start="5598" data-end="5753">
<li data-start="5598" data-end="5641">
<p data-start="5600" data-end="5641">"How can I leave a review for a product?"</p>
</li>
<li data-start="5644" data-end="5706">
<p data-start="5646" data-end="5706">"Where can I provide feedback about my shopping experience?"</p>
</li>
<li data-start="5709" data-end="5753">
<p data-start="5711" data-end="5753">"Do you take customer feedback seriously?"</p>
</li>
</ul>
</li>
<li data-start="5755" data-end="5858">
<p data-start="5757" data-end="5776"><strong data-start="5757" data-end="5776">Product Ratings</strong></p>
<ul data-start="5779" data-end="5858">
<li data-start="5779" data-end="5807">
<p data-start="5781" data-end="5807">"How do I rate a product?"</p>
</li>
<li data-start="5810" data-end="5855">
<p data-start="5812" data-end="5855">"Can I see customer reviews for this item?"</p>
</li>
</ul>
</li>
</ul>
      <Chatbot />
    </div>
  )
}

export default App