<?php
/**
 * Modal template for a single Project card.
 *
 * Expects the following variables to be defined in the including scope:
 * - $post     (WP_Post)
 * - $modal_id (string) unique DOM id
 * - $title    (string) post title
 */

$tags = get_the_terms($post->ID, 'post_tag');
$demo = get_post_meta($post->ID, 'demo_link', true);
$repo = get_post_meta($post->ID, 'repository_link', true);
?>

<div class="modal fade" id="<?php echo esc_attr( $modal_id ); ?>" tabindex="-1" aria-labelledby="<?php echo esc_attr( $modal_id ); ?>-label" aria-hidden="true">
	<div class="modal-dialog modal-lg modal-dialog-centered mt-0">
		<div class="modal-content">
			<div class="modal-header">
				<?php echo get_the_post_thumbnail( $post, 'full', array( 'class' => 'img-fluid' ) ) ?: ''; ?>
				<img src="/wp-content/uploads/2026/03/close-icon.png" class="close-icon" alt="closeicon" style="width:16px; height:16px;" data-bs-dismiss="modal" aria-label="Close">
			</div>
			<div class="modal-body">
				<h2 class="modal-title pb-0" id="<?php echo esc_attr( $modal_id ); ?>-label"><?php echo esc_html( $title ); ?></h2>
				<?php if (!empty($tags) && !is_wp_error($tags)) : ?>
					<div class="tag-wrapper d-flex flex-wrap gap-2 pt-2 pb-4">
						<?php foreach ($tags as $tag) : ?>
							<span class="pill pill-sm">
								<?php echo esc_html($tag->name); ?>
							</span>
						<?php endforeach; ?>
					</div>
				<?php endif; ?>
				<?php echo apply_filters( 'the_content', get_post_field( 'post_content', $post ) ); ?>
			</div>
			<div class="modal-footer justify-content-start">
				<?php if ( ! empty( $demo ) ) : ?>
					<a href="<?php echo esc_url( $demo ); ?>" class="btn btn-primary d-flex align-items-center" target="_blank" rel="noopener noreferrer">
						<img src="/wp-content/uploads/2026/03/open-page-icon.png" alt="githubicon" style="width:16px; height:16px; margin-right:8px;">
						View Demo
					</a>
				<?php endif; ?>
				<?php if ( ! empty( $repo ) ) : ?>
					<a href="<?php echo esc_url( $repo ); ?>" class="btn btn-secondary d-flex align-items-center" target="_blank" rel="noopener noreferrer">
						<img src="/wp-content/uploads/2026/02/github-icon.png" alt="githubicon" style="width:16px; height:16px; margin-right:8px;">
						View Repository
					</a>
				<?php endif; ?>
			</div>
		</div>
	</div>
</div>

