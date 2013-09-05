<?php
/**
 * The template for displaying the footer.
 *
 * Contains footer content and the closing of the
 * #main and #page div elements.
 *
 * @package WordPress
 * @subpackage Twenty_Thirteen
 * @since Twenty Thirteen 1.0
 */
?>

		</div><!-- #main -->
	</div><!-- #page -->

	<footer class="ui responsive grid">
	  <div class="ui sixteen wide column">
	    <!--https://support.google.com/webmasters/answer/146861-->
	    <address itemscope itemtype="http://schema.org/LocalBusiness">
	      <div class="left">
	        <span itemprop="name">Sandpiper Capital</span> —
	        <span itemprop="street-address">1613 Laskin Road, Suite 200</span> -
	        <span itemprop="locality">Virginia Beach</span>,
	        <span itemprop="region">VA</span>
	        <span itemprop="postal-code">23454</span>
	      </div>
	      <div class="right">
	        Phone: <span itemprop="tel">(757) 962-4596</span>
	        <span itemprop="geo" itemscope itemtype="http://data-vocabulary.org/Geo">
	          <meta itemprop="latitude" content="36.850827" />
	          <meta itemprop="longitude" content="-76.018237" />
	        </span>
	        <a itemprop="email" href="mailto:inquiries@sandpiper-capital.com">E-mail</a>
	      </div>
	    </address>
	  </div>
	</footer>

	<?php wp_footer(); ?>
</body>
</html>