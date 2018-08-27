$(window).bind('load', function () {
    var editor, codeMirror;
    var lp = '../img/index.html';
    var plp = 'http://placehold.it/350x250/';
    var images = [
        lp + 'team1.jpg', lp + 'team2.jpg', lp + 'team3.jpg', plp + '78c5d6/fff/image1.jpg', plp + '459ba8/fff/image2.jpg', plp + '79c267/fff/image3.jpg',
        plp + 'c5d647/fff/image4.jpg', plp + 'f28c33/fff/image5.jpg', plp + 'e868a2/fff/image6.jpg', plp + 'cc4360/fff/image7.jpg',
        lp + 'work-desk.jpg', lp + 'phone-app.png', lp + 'bg-gr-v.png'
    ];
    var html_content, css_content, js_content;
    var code_mode;
    var isEditStatus = false;

    /**
     * Run the code after Codemirror integrating.
     * 
     */
    function afterCodemirror() {
        $(".gjs-pn-codemirror-detail").addClass("display-none");

        var code_editor = `<div id="code_editor" class="gjs-code-editor display-none"></div>`;
        $(".gjs-cv-canvas").append(code_editor);

        var code_btn = document.getElementsByClassName("code-editor-btn");
        code_btn[0].click();

        var html_btn = document.getElementsByClassName("html-code-editor");
        html_btn[0].click();

        return;
    }

    /**
     * Toggle the ClassName of Dom
     * @param {string} type - Determine the type of pointer to change the class
     * @param {string} name - Name of pointer
     * @param {string} className - ClassName to toggle
     */
    function toggleClass(type, name, className) {
        switch (type) {
            case "id":
                document.getElementById(name).classList.toggle(className);
                break;
            case "class":
                document.getElementsByClassName(name)[0].classList.toggle(className);
                break;
            default:
                document.getElementById(name).classList.toggle(className);
                break;
        }
        return;
    }

    /**
     * Save HMTL, CSS and JS Code
     * @param {number} type - Editable Code Type
     */
    function saveEditor(type) {
        if (code_mode == 1) {
            editor.setComponents(codeMirror.getValue().trim());
        } else if (code_mode == 2) {
            // console.log('before ==> : ', editor.getCss());
            editor.setStyle(codeMirror.getValue().trim());
            // console.log('after ==> : ', editor.getCss());
        } else if (code_mode == 3) {
            $("iframe").contents().find("body")[0].childNodes[3].innerHTML = "";
            $("iframe").contents().find("body")[0].childNodes[3].innerHTML =
                `<div>
                    <script>setTimeout(function() {${codeMirror.getValue()}}, 100)</script>
                </div>`;
        }

        if (type == 4) {
            code_mode = null;
            return;
        }
        code_mode = type;
    }

    editor = grapesjs.init({
        height: '100%',
        container: '#gjs',
        fromElement: true,
        showOffsets: 1,
        allowScripts: 1,
        assetManager: {
            embedAsBase64: 1,
            assets: images
        },
        styleManager: {
            clearProperties: 1
        },
        // plugins: [
        //     'gjs-preset-webpage', 'grapesjs-lory-slider', 'grapesjs-tabs', 'grapesjs-custom-code',
        // ],
        plugins: [
            'gjs-preset-webpage', 'grapesjs-lory-slider', 'grapesjs-tabs', 'grapesjs-custom-code', 'gjs-plugin-ckeditor'
        ],
        pluginsOpts: {
            'grapesjs-lory-slider': {
                sliderBlock: {
                    category: 'Extra'
                }
            },
            'grapesjs-tabs': {
                tabsBlock: {
                    category: 'Extra'
                }
            },
            'gjs-plugin-ckeditor': {
                language: 'en'
            },
            'gjs-preset-webpage': {
                modalImportTitle: 'Import Template',
                modalImportLabel: '<div style="margin-bottom: 10px; font-size: 13px;">Paste here your HTML/CSS and click Import</div>',
                modalImportContent: function (editor) {
                    return editor.getHtml() + '<style>' + editor.getCss() + '</style>'
                },
                filestackOpts: {
                    key: 'AYmqZc2e8RLGLE7TGkX3Hz'
                },
                aviaryOpts: false,
                blocksBasicOpts: {
                    flexGrid: 1
                },
                customStyleManager: [{
                    name: 'General',
                    buildProps: ['float', 'display', 'position', 'top', 'right', 'left', 'bottom'],
                    properties: [{
                            name: 'Alignment',
                            property: 'float',
                            type: 'radio',
                            defaults: 'none',
                            list: [{
                                    value: 'none',
                                    className: 'fa fa-times'
                                },
                                {
                                    value: 'left',
                                    className: 'fa fa-align-left'
                                },
                                {
                                    value: 'right',
                                    className: 'fa fa-align-right'
                                }
                            ],
                        },
                        {
                            property: 'position',
                            type: 'select'
                        }
                    ],
                }, {
                    name: 'Dimension',
                    open: false,
                    buildProps: ['width', 'flex-width', 'height', 'max-width', 'min-height', 'margin', 'padding'],
                    properties: [{
                        id: 'flex-width',
                        type: 'integer',
                        name: 'Width',
                        units: ['px', '%'],
                        property: 'flex-basis',
                        toRequire: 1,
                    }, {
                        property: 'margin',
                        properties: [{
                                name: 'Top',
                                property: 'margin-top'
                            },
                            {
                                name: 'Right',
                                property: 'margin-right'
                            },
                            {
                                name: 'Bottom',
                                property: 'margin-bottom'
                            },
                            {
                                name: 'Left',
                                property: 'margin-left'
                            }
                        ],
                    }, {
                        property: 'padding',
                        properties: [{
                                name: 'Top',
                                property: 'padding-top'
                            },
                            {
                                name: 'Right',
                                property: 'padding-right'
                            },
                            {
                                name: 'Bottom',
                                property: 'padding-bottom'
                            },
                            {
                                name: 'Left',
                                property: 'padding-left'
                            }
                        ],
                    }],
                }, {
                    name: 'Typography',
                    open: false,
                    buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height', 'text-align', 'text-decoration', 'text-shadow'],
                    properties: [{
                            name: 'Font',
                            property: 'font-family'
                        },
                        {
                            name: 'Weight',
                            property: 'font-weight'
                        },
                        {
                            name: 'Font color',
                            property: 'color'
                        },
                        {
                            property: 'text-align',
                            type: 'radio',
                            defaults: 'left',
                            list: [{
                                    value: 'left',
                                    name: 'Left',
                                    className: 'fa fa-align-left'
                                },
                                {
                                    value: 'center',
                                    name: 'Center',
                                    className: 'fa fa-align-center'
                                },
                                {
                                    value: 'right',
                                    name: 'Right',
                                    className: 'fa fa-align-right'
                                },
                                {
                                    value: 'justify',
                                    name: 'Justify',
                                    className: 'fa fa-align-justify'
                                }
                            ],
                        }, {
                            property: 'text-decoration',
                            type: 'radio',
                            defaults: 'none',
                            list: [{
                                    value: 'none',
                                    name: 'None',
                                    className: 'fa fa-times'
                                },
                                {
                                    value: 'underline',
                                    name: 'underline',
                                    className: 'fa fa-underline'
                                },
                                {
                                    value: 'line-through',
                                    name: 'Line-through',
                                    className: 'fa fa-strikethrough'
                                }
                            ],
                        }, {
                            property: 'text-shadow',
                            properties: [{
                                    name: 'X position',
                                    property: 'text-shadow-h'
                                },
                                {
                                    name: 'Y position',
                                    property: 'text-shadow-v'
                                },
                                {
                                    name: 'Blur',
                                    property: 'text-shadow-blur'
                                },
                                {
                                    name: 'Color',
                                    property: 'text-shadow-color'
                                }
                            ],
                        }
                    ],
                }, {
                    name: 'Decorations',
                    open: false,
                    buildProps: ['opacity', 'background-color', 'border-radius', 'border', 'box-shadow', 'background'],
                    properties: [{
                        type: 'slider',
                        property: 'opacity',
                        defaults: 1,
                        step: 0.01,
                        max: 1,
                        min: 0,
                    }, {
                        property: 'border-radius',
                        properties: [{
                                name: 'Top',
                                property: 'border-top-left-radius'
                            },
                            {
                                name: 'Right',
                                property: 'border-top-right-radius'
                            },
                            {
                                name: 'Bottom',
                                property: 'border-bottom-left-radius'
                            },
                            {
                                name: 'Left',
                                property: 'border-bottom-right-radius'
                            }
                        ],
                    }, {
                        property: 'box-shadow',
                        properties: [{
                                name: 'X position',
                                property: 'box-shadow-h'
                            },
                            {
                                name: 'Y position',
                                property: 'box-shadow-v'
                            },
                            {
                                name: 'Blur',
                                property: 'box-shadow-blur'
                            },
                            {
                                name: 'Spread',
                                property: 'box-shadow-spread'
                            },
                            {
                                name: 'Color',
                                property: 'box-shadow-color'
                            },
                            {
                                name: 'Shadow type',
                                property: 'box-shadow-type'
                            }
                        ],
                    }, {
                        property: 'background',
                        properties: [{
                                name: 'Image',
                                property: 'background-image'
                            },
                            {
                                name: 'Repeat',
                                property: 'background-repeat'
                            },
                            {
                                name: 'Position',
                                property: 'background-position'
                            },
                            {
                                name: 'Attachment',
                                property: 'background-attachment'
                            },
                            {
                                name: 'Size',
                                property: 'background-size'
                            }
                        ],
                    }, ],
                }, {
                    name: 'Extra',
                    open: false,
                    buildProps: ['transition', 'perspective', 'transform'],
                    properties: [{
                        property: 'transition',
                        properties: [{
                                name: 'Property',
                                property: 'transition-property'
                            },
                            {
                                name: 'Duration',
                                property: 'transition-duration'
                            },
                            {
                                name: 'Easing',
                                property: 'transition-timing-function'
                            }
                        ],
                    }, {
                        property: 'transform',
                        properties: [{
                                name: 'Rotate X',
                                property: 'transform-rotate-x'
                            },
                            {
                                name: 'Rotate Y',
                                property: 'transform-rotate-y'
                            },
                            {
                                name: 'Rotate Z',
                                property: 'transform-rotate-z'
                            },
                            {
                                name: 'Scale X',
                                property: 'transform-scale-x'
                            },
                            {
                                name: 'Scale Y',
                                property: 'transform-scale-y'
                            },
                            {
                                name: 'Scale Z',
                                property: 'transform-scale-z'
                            }
                        ],
                    }]
                }, {
                    name: 'Flex',
                    open: false,
                    properties: [{
                        name: 'Flex Container',
                        property: 'display',
                        type: 'select',
                        defaults: 'block',
                        list: [{
                                value: 'block',
                                name: 'Disable'
                            },
                            {
                                value: 'flex',
                                name: 'Enable'
                            }
                        ],
                    }, {
                        name: 'Flex Parent',
                        property: 'label-parent-flex',
                        type: 'integer',
                    }, {
                        name: 'Direction',
                        property: 'flex-direction',
                        type: 'radio',
                        defaults: 'row',
                        list: [{
                            value: 'row',
                            name: 'Row',
                            className: 'icons-flex icon-dir-row',
                            title: 'Row',
                        }, {
                            value: 'row-reverse',
                            name: 'Row reverse',
                            className: 'icons-flex icon-dir-row-rev',
                            title: 'Row reverse',
                        }, {
                            value: 'column',
                            name: 'Column',
                            title: 'Column',
                            className: 'icons-flex icon-dir-col',
                        }, {
                            value: 'column-reverse',
                            name: 'Column reverse',
                            title: 'Column reverse',
                            className: 'icons-flex icon-dir-col-rev',
                        }],
                    }, {
                        name: 'Justify',
                        property: 'justify-content',
                        type: 'radio',
                        defaults: 'flex-start',
                        list: [{
                            value: 'flex-start',
                            className: 'icons-flex icon-just-start',
                            title: 'Start',
                        }, {
                            value: 'flex-end',
                            title: 'End',
                            className: 'icons-flex icon-just-end',
                        }, {
                            value: 'space-between',
                            title: 'Space between',
                            className: 'icons-flex icon-just-sp-bet',
                        }, {
                            value: 'space-around',
                            title: 'Space around',
                            className: 'icons-flex icon-just-sp-ar',
                        }, {
                            value: 'center',
                            title: 'Center',
                            className: 'icons-flex icon-just-sp-cent',
                        }],
                    }, {
                        name: 'Align',
                        property: 'align-items',
                        type: 'radio',
                        defaults: 'center',
                        list: [{
                            value: 'flex-start',
                            title: 'Start',
                            className: 'icons-flex icon-al-start',
                        }, {
                            value: 'flex-end',
                            title: 'End',
                            className: 'icons-flex icon-al-end',
                        }, {
                            value: 'stretch',
                            title: 'Stretch',
                            className: 'icons-flex icon-al-str',
                        }, {
                            value: 'center',
                            title: 'Center',
                            className: 'icons-flex icon-al-center',
                        }],
                    }, {
                        name: 'Flex Children',
                        property: 'label-parent-flex',
                        type: 'integer',
                    }, {
                        name: 'Order',
                        property: 'order',
                        type: 'integer',
                        defaults: 0,
                        min: 0
                    }, {
                        name: 'Flex',
                        property: 'flex',
                        type: 'composite',
                        properties: [{
                            name: 'Grow',
                            property: 'flex-grow',
                            type: 'integer',
                            defaults: 0,
                            min: 0
                        }, {
                            name: 'Shrink',
                            property: 'flex-shrink',
                            type: 'integer',
                            defaults: 0,
                            min: 0
                        }, {
                            name: 'Basis',
                            property: 'flex-basis',
                            type: 'integer',
                            units: ['px', '%', ''],
                            unit: '',
                            defaults: 'auto',
                        }],
                    }, {
                        name: 'Align',
                        property: 'align-self',
                        type: 'radio',
                        defaults: 'auto',
                        list: [{
                            value: 'auto',
                            name: 'Auto',
                        }, {
                            value: 'flex-start',
                            title: 'Start',
                            className: 'icons-flex icon-al-start',
                        }, {
                            value: 'flex-end',
                            title: 'End',
                            className: 'icons-flex icon-al-end',
                        }, {
                            value: 'stretch',
                            title: 'Stretch',
                            className: 'icons-flex icon-al-str',
                        }, {
                            value: 'center',
                            title: 'Center',
                            className: 'icons-flex icon-al-center',
                        }],
                    }]
                }],
            },
        },
    });

    // var comps = editor.DomComponents;
    // var defaultType = comps.getType('text');
    // var defaultModel = defaultType.model;
    // var defaultView = defaultType.view;
    // var originalMap = comps.getType('text');

    // comps.addType('text', {
    //     model: originalMap.model.extend({
    //             // Extend default properties
    //             defaults: Object.assign({}, defaultModel.prototype.defaults, {
    //             }),
    //         },
    //         // The second argument of .extend are static methods and we'll put inside our
    //         // isComponent() method. As you're putting a new Component type on top of the stack,
    //         // not declaring isComponent() might probably break stuff, especially if you extend
    //         // the default one.
    //         {
    //             isComponent: function (el) {
    //             },
    //         }),
    //     view: originalMap.view.extend({
    //         // Bind events
    //         events: {
    //             // If you want to bind the event to children elements
    //             // 'click .someChildrenClass': 'methodName',
    //             click: 'handleClick',
    //             dblclick: function () {
    //                 alert('Hi!');
    //             }
    //         },

    //         handleClick: function (e) {
    //             alert("one click");
    //         },

    //         // The render() should return 'this'
    //         render: function () {
    //             // Extend the original render method
    //             defaultType.view.prototype.render.apply(this, arguments);
    //             this.el.placeholder = 'Text here'; // <- Doesn't affect the final HTML code
    //             return this;
    //         },
    //     }),
    // });

    // editor.setCustomRte({
    //     enable: function (el, rte) {
    //         console.log("enable => : ", el, rte);
    //         // If already exists just focus
    //         if (rte) {
    //             this.focus(el, rte); // implemented later
    //             return rte;
    //         }

    //         // CKEditor initialization
    //         rte = CKEDITOR.inline(el, {
    //             toolbar: [],
    //             sharedSpaces: {
    //                 top: editor.RichTextEditor.getToolbarEl(),
    //             }
    //         });

    //         this.focus(el, rte); // implemented later
    //         return rte;
    //     },
    //     disable: function (el, rte) {
    //         console.log("disable")
    //         el.contentEditable = false;
    //         if (rte && rte.focusManager) {
    //             rte.focusManager.blur(true);
    //         }
    //     },
    //     focus: function (el, rte) {
    //         console.log("focus")
    //         // Do nothing if already focused
    //         if (rte && rte.focusManager.hasFocus) {
    //             return;
    //         }
    //         el.contentEditable = true;
    //         rte && rte.focus();
    //     },
    // });

    editor.on("component:selected", model => {
        if (model.attributes.type == "text") {
            var dom = model.view.$el[0];
            var event = new MouseEvent('dblclick', {
                'view': window,
                'bubbles': true,
                'cancelable': true
            });
            $("iframe").contents().find(`.${dom.classList[0]}`)[0].dispatchEvent(event);
            $("iframe").contents().find(`.${dom.classList[0]}`).dblclick()
        }
    })

    editor.Panels.addPanel({
        id: "codemirror",
        visible: true,
        buttons: [{
            id: "codeEditor",
            active: true,
            className: "fa fa-code code-editor-btn",
            label: '',
            command: function (editor) {
                var toggle_array = [{
                        type: "class",
                        name: "gjs-pn-codemirror-detail",
                        className: "display-none"
                    },
                    {
                        type: "class",
                        name: "gjs-pn-devices-c",
                        className: "display-none"
                    },
                    {
                        type: "class",
                        name: "gjs-pn-views",
                        className: "display-none"
                    },
                    {
                        type: "class",
                        name: "gjs-pn-views-container",
                        className: "display-none"
                    },
                    {
                        type: "class",
                        name: "gjs-cv-canvas",
                        className: "width-100"
                    },
                    {
                        type: "class",
                        name: "gjs-pn-commands",
                        className: "width-100"
                    },
                    {
                        type: "class",
                        name: "gjs-pn-options",
                        className: "right-0"
                    },
                    {
                        type: "class",
                        name: "gjs-pn-codemirror",
                        className: "right-185"
                    },
                    {
                        type: "class",
                        name: "gjs-frame",
                        className: "display-none"
                    },
                    {
                        type: "class",
                        name: "code-editor-btn",
                        className: "fas"
                    },
                    {
                        type: "class",
                        name: "code-editor-btn",
                        className: "fa"
                    },
                    {
                        type: "class",
                        name: "code-editor-btn",
                        className: "fa-hand-point-up"
                    },
                    {
                        type: "class",
                        name: "code-editor-btn",
                        className: "fa-code"
                    },
                    {
                        type: "class",
                        name: "fa-square-o",
                        className: "display-none"
                    },
                    {
                        type: "id",
                        name: "gjs-tools",
                        className: "visibility-hidden"
                    },
                    {
                        type: "id",
                        name: "code_editor",
                        className: "display-none"
                    },
                ];

                for (var i = 0; i < toggle_array.length; i++) {
                    var temp = toggle_array[i];
                    toggleClass(temp.type, temp.name, temp.className);
                }

                var html_btn = document.getElementsByClassName("html-code-editor");
                if (isEditStatus) {
                    saveEditor(4);
                    isEditStatus = false;
                } else {
                    html_btn[0].click();
                }

                code_mode = 1; // HTML Mode
            },
        }],
    });

    editor.Panels.addPanel({
        id: 'codemirror-detail',
        visible: true,
        buttons: [{
                id: 'codeEditor-html',
                active: true,
                className: 'html-code-editor',
                label: 'HTML',
                command: function (editor) {
                    if (!isEditStatus) isEditStatus = true;
                    else {
                        saveEditor(1);
                    }

                    $("#code_editor").html("");
                    html_content = $("iframe").contents().find("body")[0].childNodes[1].innerHTML;
                    codeMirror = CodeMirror(document.getElementById("code_editor"), {
                        mode: "text/html",
                        extraKeys: {
                            "Ctrl-Space": "autocomplete"
                        },
                        lineNumbers: true,
                        lineWrapping: true,
                        styleActiveLine: true,
                        matchBrackets: true,
                        theme: "dracula",
                        keyMap: "sublime",
                        tabMode: 'indent',
                        autoCloseTags: true,
                        value: html_content
                    });
                    var totalLines = codeMirror.lineCount();
                    var totalChars = html_content.length;
                    codeMirror.autoFormatRange({
                        line: 0,
                        ch: 0
                    }, {
                        line: totalLines,
                        ch: totalChars
                    });
                }
            },
            {
                id: 'codeEditor-css',
                active: false,
                className: '',
                label: 'CSS',
                command: function (editor) {
                    saveEditor(2);
                    $("#code_editor").html("");
                    css_content = editor.getCss();
                    codeMirror = CodeMirror(document.getElementById("code_editor"), {
                        mode: "text/css",
                        extraKeys: {
                            "Ctrl-Space": "autocomplete"
                        },
                        lineNumbers: true,
                        lineWrapping: true,
                        styleActiveLine: true,
                        matchBrackets: true,
                        theme: "dracula",
                        keyMap: "sublime",
                        tabMode: 'indent',
                        autoCloseTags: true,
                        value: css_content
                    });
                    var totalLines = codeMirror.lineCount();
                    var totalChars = css_content.length;
                    codeMirror.autoFormatRange({
                        line: 0,
                        ch: 0
                    }, {
                        line: totalLines,
                        ch: totalChars
                    });
                }
            },
            {
                id: 'codeEditor-js',
                active: false,
                className: '',
                label: 'JS',
                command: function (editor) {
                    saveEditor(3);
                    $("#code_editor").html("");
                    js_content = editor.getJs();

                    codeMirror = CodeMirror(document.getElementById("code_editor"), {
                        mode: "text/javascript",
                        extraKeys: {
                            "Ctrl-Space": "autocomplete"
                        },
                        lineNumbers: true,
                        lineWrapping: true,
                        styleActiveLine: true,
                        matchBrackets: true,
                        theme: "dracula",
                        keyMap: "sublime",
                        tabMode: 'indent',
                        autoCloseTags: true,
                        value: js_content
                    });
                    var totalLines = codeMirror.lineCount();
                    var totalChars = js_content.length;
                    codeMirror.autoFormatRange({
                        line: 0,
                        ch: 0
                    }, {
                        line: totalLines,
                        ch: totalChars
                    });
                }
            }
        ]
    });

    afterCodemirror();

})