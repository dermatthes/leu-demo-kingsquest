
KaToolsV1.ce_define("leu-isopen",
    /**
     *
     * @param $tpl
     * @param openHours {KaToolsV1.openhours}
     */
    function ($tpl, openHours) {
        let scope = {
            isOpen: openHours.isOpen(),
            nextOpen: openHours.getNextOpenDate(),
            $fn: {
                dateFmt: (date, type = "default") => {
                    if (type === "default")
                        return new Intl.DateTimeFormat([], { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute:'numeric'}).format(new Date(date));
                },
            }
        }
        $tpl.render(scope)
    },
    KaToolsV1.html`

        <span ka:if='isOpen' class="fw-bold alert-soft-info fs-3" style="color: #0ABF53"><i class="bi bi-clock me-3"></i>[[leu_translate('Unsere Praxis ist geöffnet')]]</span>
        <span ka:if=' ! isOpen' class="fw-bold text-white fs-3" style="">
            <i class="bi bi-clock-history me-3"></i>[[leu_translate('Unsere Praxis ist geschlossen.')]]
            <br>
            <span class="fw-normal">
            [[leu_translate('Wir öffnen wieder am')]] [[$fn.dateFmt(nextOpen)]] [[leu_translate('Uhr')]]</span>
        </span>

`
)
