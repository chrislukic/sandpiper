<?php
/**
 * The Header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="main">
 *
 * @package WordPress
 * @subpackage Twenty_Thirteen
 * @since Twenty Thirteen 1.0
 */
?><!DOCTYPE html>
<!--[if IE 7]>
<html class="ie ie7" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 8]>
<html class="ie ie8" <?php language_attributes(); ?>>
<![endif]-->
<!--[if !(IE 7) | !(IE 8)  ]><!-->
<html <?php language_attributes(); ?>>
<!--<![endif]-->
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width">
	<title><?php wp_title( '|', true, 'right' ); ?></title>
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<meta name="viewport" content="width=device-width; initial-scale=1; maximum-scale=1">
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700' rel='stylesheet' type='text/css' />
	<link href='http://fonts.googleapis.com/css?family=Quattrocento' rel='stylesheet' type='text/css'>
	<link href='http://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>

	<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>css/semantic/modules/transition.min.css" />
	<link rel="stylesheet" href="css/semantic/collections/grid.min.css" />
	<link rel="stylesheet" href="css/semantic/collections/menu.min.css" />
	<link rel="stylesheet" href="css/semantic/views/list.min.css" />
	<link rel="stylesheet" href="css/semantic/views/sitemap.min.css" />
	<link rel="stylesheet" href="css/semantic/elements/header.min.css" />
	<link rel="stylesheet" href="css/semantic/elements/divider.min.css" />
	<link rel="stylesheet" href="css/semantic/elements/icons.min.css" />
	<link rel="stylesheet" href="css/semantic/elements/button.min.css" />
	<link rel="stylesheet" href="css/semantic/elements/image.min.css" />
	<link rel="stylesheet" href="css/semantic/elements/segment.min.css" />
	<link rel="stylesheet" href="css/reset.css" />
	<link rel="stylesheet" href="css/global.css" />
	<link rel="stylesheet" href="css/header.css" />
	<link rel="stylesheet" href="css/responsive.css" />
	<link rel="stylesheet" href="css/responsive.css" />

	<script src="js/jquery.js"></script>
	<script src="js/affix.js"></script>
	<script src="css/semantic/modules/transition.min.js"></script>
	<script type="text/javascript">
	$(document)
	  .ready(function() {

	    $('nav.grid')
	      .affix({
	        offset: {
	          top    : $('nav.grid').offset().top,
	          bottom : $('footer').outerHeight(true)
	        }
	      })
	    ;
	    $('nav .mobile')
	      .on('click', function() {
	        $(this).toggleClass('active').next().transition('fade down');
	      })
	    ;
	    setTimeout(function(){
	      $('.banner .text').transition('fade in');
	    }, 1500);
	    setTimeout(function(){
	      $('.banner img').transition('slide up');
	    }, 500);
	  })
	;
	</script>
	<!--[if lt IE 9]>
	<script src="<?php echo get_template_directory_uri(); ?>/js/html5.js"></script>
	<![endif]-->
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<div id="page" class="hfeed site">
	  <header>
	    <div class="ui responsive padded grid">
	      <div class="row" itemscope itemtype="http://schema.org/LocalBusiness">
	        <div class="five wide left floated column">
	          <a href="http://sandpiper-capital" alt="<?php bloginfo( 'name' ); ?>">
	            <img src="images/logo.png" />
	          </a>
	        </div>
	        <div class="five wide right floated column">
	          <address>
	            <span itemprop="street-address">1613 Laskin Road, Suite 200</span><br />
	            <span itemprop="locality">Virginia Beach</span>, <span itemprop="region">VA</span>
	            <span itemprop="postal-code">23454</span><br />
	            <span itemprop="tel">(757) 962-4596</span>
	            <span itemprop="geo" itemscope itemtype="http://data-vocabulary.org/Geo">
	            <meta itemprop="latitude" content="36.850827" />
	            <meta itemprop="longitude" content="-76.018237" />
	          </address>
	        </div>
	      </div>
	    </div>
	    <nav class="ui responsive grid">
	      <div class="ui sixteen wide column">
	        <img src="images/sandpiper-icon.png">
	        <div class="mobile">
	          Menu <i class="content icon link"></i>
	        </div>
	        <div class="links">
	          <a href="index.html">Home</a>
	          <a href="about.html">About Us</a>
	          <a class="active" href="services.html">Services</a>
	          <a href="insights.html">Investor Insight</a>
	          <a href="contact.html">Contact Us</a>
	        </div>
	      </div>
	    </nav>
	    <div class="placeholder"></div>
	  </header>
		<div id="main" class="site-main">
