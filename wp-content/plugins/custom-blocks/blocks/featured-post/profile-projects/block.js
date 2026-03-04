const { useSelect } = wp.data;
const { Fragment } = wp.element;

registerBlockType('featured-posts/profile-projects', {
    title: 'Profile Featured Projects',
    icon: 'cover-image',
    category: 'custom-blocks',
    attributes: {
        title:   { type: 'string', default: '' },
        content: { type: 'string', default: '' },
    },

    edit({ attributes, setAttributes }) {
        const { title, content } = attributes;

        // Fetch 'projects' CPT, embed featured media
        const posts = useSelect(
            (select) => select('core').getEntityRecords('postType', 'projects', { per_page: 6, _embed: true }),
            []
        );

        if (!posts) return createElement('p', null, 'Loading...');

        return createElement(Fragment, null,
            // Sidebar settings
            createElement(InspectorControls, null,
                createElement(PanelBody, { title: 'Projects Section Settings', initialOpen: true },
                    createElement(RichText, {
                        tagName: 'h2',
                        label: 'Projects Title',
                        value: title,
                        onChange: (v) => setAttributes({ title: v }),
                    }),
                    createElement(RichText, {
                        tagName: 'p',
                        label: 'Projects Content',
                        value: content,
                        onChange: (v) => setAttributes({ content: v }),
                    })
                )
            ),

            // Editor preview
            createElement('div', { className: 'profile-projects-preview' },
                createElement('h2', null, title || 'Project Section Title'),
                createElement('p', null, content || 'Project Section Content'),
                createElement('div', { className: 'projects-list' },
                    posts.map((post) => {
                        const img = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
                        return createElement('div', { key: post.id, className: 'project-item' },
                            img && createElement('img', { src: img, alt: post.title.rendered, className: 'project-image' }),
                            createElement('h3', null, post.title.rendered),
                            createElement('div', { dangerouslySetInnerHTML: { __html: post.excerpt?.rendered || '' } })
                        );
                    })
                )
            )
        );
    },

    // Front-end rendered via PHP
    save() {
        return null;
    }
});