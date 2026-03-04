<?php
/**
 * Render callback for Profile Projects block
 */

if (!function_exists('custom_blocks_render_profile_projects')) {
    function custom_blocks_render_profile_projects($attributes, $content = '', $block = null) {
        $section_title   = !empty($attributes['title']) ? $attributes['title'] : '';
        $section_content = !empty($attributes['content']) ? $attributes['content'] : '';

        $projects = get_posts([
            'post_type'      => 'projects',
            'posts_per_page' => 3,
            'orderby'        => 'date',
            'order'          => 'DESC',
        ]);

        if (empty($projects)) {
            return '<p>No projects found.</p>';
        }

        ob_start();
        ?>
        <section class="profile-projects bg-dark" id="projects">
            <div class="container">
                <div class="row">
                    <div class="col-12 text-center">
                        <?php if ($section_title !== '') : ?>
                            <h2 class="h2"><?php echo esc_html($section_title); ?></h2>
                        <?php endif; ?>
                        <?php if ($section_content !== '') : ?>
                            <p><?php echo esc_html($section_content); ?></p>
                        <?php endif; ?>
                    </div>
                </div>

                <div class="row pt-5">
                    <?php foreach ($projects as $post) : ?>
                        <?php
                        setup_postdata($post);

                        $title         = get_the_title($post);
                        $repo_url      = get_post_meta($post->ID, 'repo_url', true);
                        $demo_url      = get_post_meta($post->ID, 'demo_url', true);
                        $thumbnail     = get_the_post_thumbnail($post, 'full', ['class' => 'img-fluid card-img-top']);
                        $modal_id      = 'projectModal-' . (int) $post->ID;
                        $raw_excerpt   = get_the_excerpt($post);
                        $excerpt_clean = wp_strip_all_tags($raw_excerpt, true);
                        $tags          = get_the_terms($post->ID, 'post_tag');
                        ?>

                        <div class="col-md-4">
                            <div class="card h-100 profile-project-card position-relative">
                                <div class="project-card-thumb">
                                    <?php echo $thumbnail ?: ''; ?>

                                    <div class="project-card-thumb__overlay">
                                        <div class="project-card-thumb__actions">
                                            <?php if (!empty($repo_url)) : ?>
                                                <a href="<?php echo esc_url($repo_url); ?>"
                                                   class="btn btn-outline-light btn-sm"
                                                   target="_blank"
                                                   rel="noopener noreferrer">
                                                    Repo
                                                </a>
                                            <?php endif; ?>

                                            <?php if (!empty($demo_url)) : ?>
                                                <a href="<?php echo esc_url($demo_url); ?>"
                                                   class="btn btn-outline-light btn-sm"
                                                   target="_blank"
                                                   rel="noopener noreferrer">
                                                    Demo
                                                </a>
                                            <?php endif; ?>

                                            <button type="button"
                                                    class="btn btn-outline-light btn-sm"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#<?php echo esc_attr($modal_id); ?>">
                                                Learn More
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div class="card-body">
                                    <h3 class="card-title"><?php echo esc_html($title); ?></h3>

                                    <?php if ($excerpt_clean !== '') : ?>
                                        <p class="card-text"><?php echo esc_html($excerpt_clean); ?></p>
                                    <?php endif; ?>

                                    <?php if (!empty($tags) && !is_wp_error($tags)) : ?>
                                        <div class="tag-wrapper d-flex flex-wrap gap-2">
                                            <?php foreach ($tags as $tag) : ?>
                                                <span class="pill pill-sm">
                                                    <?php echo esc_html($tag->name); ?>
                                                </span>
                                            <?php endforeach; ?>
                                        </div>
                                    <?php endif; ?>

                                    <a class="stretched-link project-card-stretched"
                                       href="#<?php echo esc_attr($modal_id); ?>"
                                       role="button"
                                       data-bs-toggle="modal"
                                       data-bs-target="#<?php echo esc_attr($modal_id); ?>"
                                       aria-label="<?php echo esc_attr($title); ?>">
                                    </a>
                                </div>
                            </div>
                        </div>

                        <?php
                        // Modal with full image and content (separated into modal.php template).
                        include __DIR__ . '/modal.php';
                        ?>
                    <?php endforeach; ?>
                </div>
            </div>
        </section>
        <?php

        wp_reset_postdata();

        return trim(ob_get_clean());
    }
}