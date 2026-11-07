<?php
require_once __DIR__ . '/../config.php';
if (session_status() !== PHP_SESSION_ACTIVE) {
    $secure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off');
    session_set_cookie_params(['lifetime'=>0,'path'=>'/','secure'=>$secure,'httponly'=>true,'samesite'=>'Lax']);
    session_start();
}
define('ROOT', dirname(__DIR__));
function e($v){ return htmlspecialchars((string)$v, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }
function json_read($name,$fallback=[]){ $p=ROOT.'/data/'.$name; if(!is_file($p)) return $fallback; $x=json_decode(file_get_contents($p),true); return is_array($x)?$x:$fallback; }
function json_write($name,$value){ $p=ROOT.'/data/'.$name; $tmp=$p.'.tmp'; file_put_contents($tmp,json_encode($value,JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES),LOCK_EX); return rename($tmp,$p); }
function lang(){ return (isset($_GET['lang']) && $_GET['lang']==='en') ? 'en':'uz'; }
function t($uz,$en){ return lang()==='en' ? $en : $uz; }
function url($page='home',$params=[]){ $a=['page'=>$page,'lang'=>lang()]+$params; return 'index.php?'.http_build_query($a); }
function site_header($title=''){ $l=lang(); $label=$title ? $title.' | FERUZBEK.DEV':'FERUZBEK.DEV | Personal IT Universe'; ?>
<!doctype html><html lang="<?=e($l)?>"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="theme-color" content="#07090d"><meta name="color-scheme" content="dark"><meta name="description" content="Feruzbek Normamatov — Linux, Cisco Networking, MikroTik, practical labs, technical notes and projects."><meta property="og:title" content="<?=e($label)?>"><meta property="og:description" content="Personal IT Universe — Learn. Build. Share."><meta property="og:type" content="website"><title><?=e($label)?></title><link rel="icon" href="assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/style.css?v=4.0"></head><body>
<a class="skip-link" href="#mainContent">Skip to content</a><canvas id="matrix" aria-hidden="true"></canvas><div class="noise"></div><header class="topbar"><div class="container nav"><a class="logo" href="index.php" aria-label="Feruzbek.dev home"><span class="logo-mark">FN</span><span class="logo-word">FERUZBEK<span class="muted">.DEV</span></span></a><button class="menu-toggle" id="menuToggle" aria-label="Open navigation" aria-expanded="false" aria-controls="mainNav"><span></span><span></span></button><nav id="mainNav" class="nav-links"><a href="<?=url('home')?>">HOME</a><a href="<?=url('knowledge')?>">KNOWLEDGE</a><a href="<?=url('academy')?>">ACADEMY</a><a href="<?=url('commands')?>">COMMANDS</a><a href="<?=url('labs')?>">LABS</a><a href="<?=url('projects')?>">PROJECTS</a><a href="<?=url('certificates')?>">CREDENTIALS</a><a href="<?=url('resume')?>">RESUME</a><a class="mobile-admin" href="admin.php">ADMIN ↗</a></nav><div class="nav-right"><a class="lang" href="<?=e('index.php?'.http_build_query(array_merge($_GET,['lang'=>$l==='uz'?'en':'uz'])))?>"><?=$l==='uz'?'EN':'UZ'?></a><a class="admin-link" href="admin.php">ADMIN ↗</a></div></div></header>
<main class="container page-main" id="mainContent">
<?php }
function site_footer(){ ?>
</main><footer class="footer"><div class="container foot-inner"><div><b>FN // FERUZBEK.DEV</b><small>Learn · Build · Share · Improve</small></div><div class="foot-links"><a href="https://t.me/normamatovferuz" target="_blank" rel="noopener">Telegram ↗</a><a href="https://instagram.com/feruzbeknormamatovv" target="_blank" rel="noopener">Instagram ↗</a><a href="https://github.com/Feruzbek20061803" target="_blank" rel="noopener">GitHub ↗</a><a href="tel:+998912970009">+998 91 297 00 09</a></div><small>© <?=date('Y')?> Normamatov Feruzbek</small></div></footer><script src="assets/app.js?v=4.0" defer></script></body></html><?php }
function markdown_safe($raw){
    $codes=[];
    $raw=preg_replace_callback('/```[a-zA-Z0-9_-]*\s*\n(.*?)```/s',function($m)use(&$codes){$key='@@CODEBLOCK'.count($codes).'@@';$codes[$key]='<pre><code>'.e(trim($m[1])).'</code></pre>';return "\n".$key."\n";},(string)$raw);
    $text=e($raw);
    $text=preg_replace('/`([^`]+)`/','<code>$1</code>',$text);
    $text=preg_replace('/\*\*(.*?)\*\*/','<strong>$1</strong>',$text);
    $text=preg_replace('/\*(.*?)\*/','<em>$1</em>',$text);
    $lines=preg_split('/\r?\n/',$text);$out='';$list=false;
    foreach($lines as $line){$s=trim($line);if($s===''){if($list){$out.='</ul>';$list=false;}continue;}
      if(preg_match('/^@@CODEBLOCK(\d+)@@$/',$s,$m)){if($list){$out.='</ul>';$list=false;}$out.='@@CODEBLOCK'.$m[1].'@@';continue;}
      if(preg_match('/^###\s+(.*)$/',$s,$m)){if($list){$out.='</ul>';$list=false;}$out.='<h3>'.$m[1].'</h3>';continue;}
      if(preg_match('/^##\s+(.*)$/',$s,$m)){if($list){$out.='</ul>';$list=false;}$out.='<h2>'.$m[1].'</h2>';continue;}
      if(preg_match('/^[-*]\s+(.*)$/',$s,$m)){if(!$list){$out.='<ul>';$list=true;}$out.='<li>'.$m[1].'</li>';continue;}
      if($list){$out.='</ul>';$list=false;}$out.='<p>'.$s.'</p>';
    }
    if($list)$out.='</ul>';foreach($codes as $k=>$v)$out=str_replace($k,$v,$out);return $out;
}
