<template>
  <div>
    <div v-highlight class="article_content">
      <pre>
        <code class="font" v-html="html" />
      </pre>
    </div>
    <div v-highlight class="article_content">
      <pre>
        <code class="font" v-html="html2" />
      </pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeightLight',
  data() {
    return {
      html: `
          // 示例代码
          &lt;?php
         
            file_put_contents("post.txt",var_export($_REQUEST,true), FILE_APPEND);
              $returnArray = array( // 返回字段
                  "memberid" => $_REQUEST["memberid"], // 商户ID
                  "orderid" =>  $_REQUEST["orderid"], // 订单号
                  "amount" =>  $_REQUEST["amount"], // 交易金额
                  "datetime" =>  $_REQUEST["datetime"], // 交易时间
                  "transaction_id" =>  $_REQUEST["transaction_id"], // 支付流水号
                  "returncode" => $_REQUEST["returncode"],
              );
              $md5key = "dl6ly890sidelzshr47c1ndxvxrrehl1";
              ksort($returnArray);
              reset($returnArray);
              $md5str = "";
              foreach ($returnArray as $key => $val) {
                  $md5str = $md5str . $key . "=" . $val . "&";
              }
              $sign = strtoupper(md5($md5str . "key=" . $md5key));
              if ($sign == $_REQUEST["sign"]) {
                  if ($_REQUEST["returncode"] == "00") {
                        $str = "交易成功！订单号：".$_REQUEST["orderid"];
                        file_put_contents("success.txt",$str."\\n", FILE_APPEND);
                        exit("ok");
                  }
              }

              echo 'fail';
          ?&gt;
        `,
      html2: `
           &lt;?php
            error_reporting(0);
            header("Content-type: text/html; charset=utf-8");
            $pay_memberid = "1";   //商户ID
            $pay_orderid = 'E'.date("YmdHis").rand(100000,999999);    //订单号
            $pay_amount = "5000000";    //交易金额
            $pay_applydate = date("Y-m-d H:i:s");  //订单时间
            $pay_notifyurl = "http://yourdomain/php/server.php";   //服务端返回地址
            $pay_callbackurl = "http://yourdomain/php/page.php";  //页面跳转返回地址
            $Md5key = "dl6ly890sidelzshr47c1ndxvxrrehl1";   //密钥
            $tjurl = "http://yourdomain/api/payment";   //提交地址
            $pay_bankcode = "903";   //银行编码
            //扫码
            $native = array(
                "pay_memberid" => $pay_memberid,
                "pay_orderid" => $pay_orderid,
                "pay_amount" => $pay_amount,
                "pay_applydate" => $pay_applydate,
                "pay_bankcode" => $pay_bankcode,
                "pay_notifyurl" => $pay_notifyurl,
                "pay_callbackurl" => $pay_callbackurl,
            );
            ksort($native);
            $md5str = "";
            foreach ($native as $key => $val) {
                $md5str = $md5str . $key . "=" . $val . "&";
            }
            //echo($md5str . "key=" . $Md5key);
            $sign = strtoupper(md5($md5str . "key=" . $Md5key));
            $native["pay_md5sign"] = $sign;
            $native['pay_attach'] = "1234|456";
            $native['pay_productname'] ='VIP基础服务';
            ?&gt;
             &lt;!DOCTYPE html&gt;
             &lt;html lang="zh-CN"&gt;
             &lt;head&gt;
                 &lt;meta charset="utf-8"&gt;
                 &lt;meta http-equiv="X-UA-Compatible" content="IE=edge"&gt;
                 &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;
                 &lt;title&gt;支付Demo &lt;/title&gt;
                 &lt;!-- Bootstrap --&gt;
                 &lt;link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css"
                      integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"&gt;
                 &lt;!--[if lt IE 9]&gt;
                 &lt;script src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"&gt; &lt;/script&gt;
                 &lt;script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"&gt; &lt;/script&gt;
                 &lt;![endif]--&gt;
             &lt;/head&gt;
             &lt;body&gt;
             &lt;div class="container"&gt;
                 &lt;div class="row" style="margin:15px;0;"&gt;
                     &lt;div class="col-md-12"&gt;
                         &lt;form class="form-inline" method="post" action=" &lt;?php echo $tjurl; ?&gt;"&gt;
                             &lt;?php
                            foreach ($native as $key => $val) {
                                echo ' &lt;input type="hidden" name="' . $key . '" value="' . $val . '"&gt;';
                            }
                            ?&gt;
                             &lt;button type="submit" class="btn btn-success btn-lg"&gt;扫码支付(金额： &lt;?php echo $pay_amount; ?&gt;元) &lt;/button&gt;
                         &lt;/form&gt;
                     &lt;/div&gt;
                 &lt;/div&gt;
             &lt;/div&gt;
             &lt;script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt; &lt;/script&gt;
             &lt;script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"
                    integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
                    crossorigin="anonymous"&gt; &lt;/script&gt;
             &lt;/body&gt;
             &lt;/html&gt;
        `
    }
  }
}
</script>
<style scoped>
.article_content {
  text-align: left;
}
.font {
  font-family: Menlo, Monaco, Consolas, Courier New, monospace;
}
</style>
