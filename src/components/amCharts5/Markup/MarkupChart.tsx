import { Root, Container, Rectangle, Label, Bullet, Circle, Scrollbar, Tooltip, color, p100, p50 } from "@amcharts/amcharts5";
import { XYChart, DateAxis, AxisRendererX, AxisRendererY, ValueAxis, XYCursor, LineSeries } from "@amcharts/amcharts5/xy";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect, useRef } from "react";

import am5locales_pt_BR from "@/components/amCharts5/language_pt-BR";
import { MarkupChartProps } from "@/components/amCharts5/Markup/types";

function createChart({ data, themeColors }: MarkupChartProps): Root {
    // Cria uma nova instância da raiz do amCharts5 em português
    const root = Root.new("chartdiv");
    root.locale = am5locales_pt_BR;

    // Aplica o tema animado e responsivo ao gráfico
    root.setThemes([am5themes_Animated.new(root), am5themes_Responsive.new(root)]);

    // Ativa a funcionalidade de toque para ativar
    root.tapToActivate = true;

    // Cria uma instância de XYChart dentro da raiz
    const chart = root.container.children.push(
        XYChart.new(root, {
            panX: false, // Desabilita o movimento horizontal do gráfico
            panY: false, // Desabilita o movimento vertical do gráfico
        }),
    );
    // Cria um contêiner de sobreposição para instruções de zoom
    const overlay = root.container.children.push(
        Container.new(root, {
            width: p100, // Ocupa 100% da largura
            height: p100, // Ocupa 100% da altura
            layer: 100, // Define a camada do overlay
            visible: false, // Inicialmente o overlay está oculto
        }),
    );
    // Adiciona um retângulo semi-transparente ao contêiner de sobreposição
    overlay.children.push(
        Rectangle.new(root, {
            width: p100,
            height: p100,
            fill: color(0x000000),
            fillOpacity: 0.3,
        }),
    );
    // Adiciona um rótulo de texto ao contêiner de sobreposição para instruir o usuário sobre como usar o zoom
    overlay.children.push(
        Label.new(root, {
            text: "Use CTRL + Scroll para zoom",
            fontSize: 30,
            x: p50,
            y: p50,
            centerX: p50,
            centerY: p50,
        }),
    );
    // Implementa o zoom com a tecla CTRL
    chart.plotContainer.events.on("wheel", function (ev) {
        if (ev.originalEvent.ctrlKey) {
            ev.originalEvent.preventDefault();
            chart.set("wheelX", "panX"); // Habilita o movimento horizontal do gráfico para zoom
            chart.set("wheelY", "zoomX"); // Habilita o zoom horizontal
        } else {
            chart.set("wheelX", "none"); // Desabilita o movimento horizontal do gráfico
            chart.set("wheelY", "none"); // Desabilita o zoom
            overlay.show().catch((err) => console.error(err)); // Mostra o overlay com instruções
            overlay.setTimeout(function () {
                overlay.hide().catch((err) => console.error(err)); // Oculta o overlay após alguns segundos
            }, 800);
        }
    });

    // Cria o eixo X (data)
    const xAxisRenderer = AxisRendererX.new(root, {
        minorGridEnabled: true, // Habilita as linhas de grade menores
        minGridDistance: 18, // Espaçamento mínimo entre as linhas de grade
    });
    xAxisRenderer.labels.template.setAll({
        rotation: -45, // Direção dos label do eixo X
    });
    const xAxis = DateAxis.new(root, {
        maxDeviation: 0,
        minZoomCount: 3,
        groupData: false,
        baseInterval: {
            timeUnit: "day",
            count: 1,
        },
        gridIntervals: [
            { timeUnit: "day", count: 1 },
            { timeUnit: "month", count: 1 },
        ],
        renderer: xAxisRenderer,
        tooltip: Tooltip.new(root, {}),
    });
    chart.xAxes.push(xAxis);
    xAxis.data.setAll(data); // Define os dados para o eixo X

    // Cria o eixo Y (valor)
    const yAxis = ValueAxis.new(root, {
        maxDeviation: 0,
        renderer: AxisRendererY.new(root, {}),
    });
    chart.yAxes.push(yAxis);

    // Caixa do gráfico
    const tooltipSeries = Tooltip.new(root, {
        pointerOrientation: "horizontal", // Orientação do ponteiro do tooltip
        labelText: "{valueY}", // Texto do tooltip
        autoTextColor: false,
    });
    tooltipSeries.label.setAll({
        fill: color(themeColors.secondary),
    });
    // Cria a série de dados
    const series1 = LineSeries.new(root, {
        minBulletDistance: 5, // Espaçamento mínimo entre os pontos da série
        xAxis: xAxis, // Eixo X da série
        yAxis: yAxis, // Eixo Y da série
        valueYField: "value", // Campo de dados para o eixo Y
        valueXField: "date", // Campo de dados para o eixo X
        tooltip: tooltipSeries,
    });
    chart.series.push(series1);
    // Linha
    series1.strokes.template.setAll({
        strokeWidth: 3, // Espessura da linha da série
    });
    // Preenchimento
    series1.fills.template.setAll({
        fillOpacity: 0.5, // Opacidade do preenchimento da série
        visible: true, // Preenchimento visível
    });
    series1.data.setAll(data); // Define os dados para a série
    // Adiciona pontos à série
    series1.bullets.push(function () {
        return Bullet.new(root, {
            sprite: Circle.new(root, {
                radius: 5, // Raio dos pontos
                fill: series1.get("fill"), // Cor dos pontos
                stroke: root.interfaceColors.get("background"), // Cor da borda dos pontos
                strokeWidth: 2, // Espessura da borda dos pontos
            }),
        });
    });

    // Colors
    series1.set("stroke", color(themeColors.primary));
    series1.set("fill", color(themeColors.primary));
    root.interfaceColors.set("background", color(themeColors.secondary));
    root.interfaceColors.set("text", color(themeColors.primary));
    root.interfaceColors.set("grid", color(themeColors.border));

    // Cria o cursor
    const cursor = chart.set(
        "cursor",
        XYCursor.new(root, {
            xAxis: xAxis, // Eixo X do cursor
        }),
    );
    cursor.lineY.set("visible", false); // Oculta a linha vertical do cursor

    // Cria a barra de rolagem horizontal
    const scrollbar = chart.set(
        "scrollbarX",
        Scrollbar.new(root, {
            orientation: "horizontal", // Orientação horizontal
            maxHeight: 3, // Altura máxima da barra de rolagem
            start: 0, // Posição inicial da barra de rolagem
            end: 1, // Posição final da barra de rolagem
        }),
    );
    scrollbar.startGrip.set("scale", 0.7); // Tamanho da área de clique no início da barra
    scrollbar.endGrip.set("scale", 0.7); // Tamanho da área de clique no final da barra

    // Ocultar bottam de out zoom
    // chart.zoomOutButton.set("forceHidden", true);

    return root;
}

function MarkupChart({ data, themeColors }: MarkupChartProps): React.ReactNode {
    const rootRef = useRef<Root | null>(null);
    // Use useLayoutEffect para operações de sincronização de layout
    useLayoutEffect(() => {
        const root = createChart({ data, themeColors });
        rootRef.current = root;

        return () => {
            if (rootRef.current) {
                rootRef.current.dispose();
            }
        };
    }, [data, themeColors]);

    return <div id="chartdiv" style={{ width: "100%", height: "300px" }} />;
}

export default MarkupChart;
