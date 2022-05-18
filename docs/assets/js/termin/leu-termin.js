KaToolsV1.ce_define("leu-termin", ($tpl, $this) => {
    let scope = {
        step: 1,
        gruende: [
            leu_translate('Kontrolle'),
            leu_translate('Schmerzen'),
            leu_translate('Beratung'),
            leu_translate('Ṕrophylaxe'),
            leu_translate('sonstiges'),
        ],
        data: {

            grund: null,
            termine: {},
            name: null,
            email: null,
            telefon: null
        },
        $on: {
            change: () => {
                console.log("change");
                scope.step++;
                $tpl.render(scope);
            }
        }
    }
    $tpl.render(scope);
}, KaToolsV1.loadHtml('assets/js/termin/termin.tpl.html'));
