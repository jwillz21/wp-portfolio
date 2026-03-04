<?php
/**
 * Modal template for a single Project card.
 *
 * Expects the following variables to be defined in the including scope:
 * - $post     (WP_Post)
 * - $modal_id (string) unique DOM id
 * - $title    (string) post title
 */

?>
<div class="modal fade" id="<?php echo esc_attr( $modal_id ); ?>" tabindex="-1" aria-labelledby="<?php echo esc_attr( $modal_id ); ?>-label" aria-hidden="true">
	<div class="modal-dialog modal-lg modal-dialog-centered">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="<?php echo esc_attr( $modal_id ); ?>-label"><?php echo esc_html( $title ); ?></h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="<?php esc_attr_e( 'Close', 'understrap-child' ); ?>"></button>
			</div>
			<div class="modal-body">
				<?php
				echo get_the_post_thumbnail( $post, 'full', array( 'class' => 'img-fluid mb-3' ) ) ?: '';
				echo apply_filters( 'the_content', get_post_field( 'post_content', $post ) );
				?>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
					<?php esc_html_e( 'Close', 'understrap-child' ); ?>
				</button>
			</div>
		</div>
	</div>
</div>

