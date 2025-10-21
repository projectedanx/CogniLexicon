
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { GraphData, GraphNode as D3GraphNode, GraphLink as D3GraphLink } from '../types';

interface KnowledgeGraphProps {
  data: GraphData;
}

// Fix: Simplify Node interface to correctly inherit properties from d3.SimulationNodeDatum.
// The redundant properties were preventing typescript from seeing properties like x, y, fx, fy.
interface Node extends D3GraphNode, d3.SimulationNodeDatum {}

// Fix: Correct Link interface to resolve type conflict.
// D3GraphLink defines `source`/`target` as `string`, but d3 simulation mutates them into `Node` objects.
// Extending `d3.SimulationLinkDatum<Node>` provides the correct wide type (`string | number | Node`)
// and removing the extension of `D3GraphLink` resolves the conflict.
interface Link extends d3.SimulationLinkDatum<Node> {
    value: number;
}

export const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data || !svgRef.current || !containerRef.current) return;

    const { nodes: dataNodes, links: dataLinks } = data;
    
    // Deep copy to avoid mutation issues
    const nodes: Node[] = JSON.parse(JSON.stringify(dataNodes));
    const links: Link[] = JSON.parse(JSON.stringify(dataLinks));

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = 500;

    const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [-width / 2, -height / 2, width, height])
        .style('max-width', '100%')
        .style('height', 'auto');

    svg.selectAll("*").remove(); // Clear previous graph

    const simulation = d3.forceSimulation<Node>(nodes)
      .force("link", d3.forceLink<Node, Link>(links).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(0,0))
      .force("x", d3.forceX())
      .force("y", d3.forceY());

    const link = svg.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
        .attr("stroke-width", d => Math.sqrt(d.value));

    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const node = svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
      .selectAll<SVGCircleElement, Node>("circle")
      .data(nodes)
      .join("circle")
        .attr("r", (d) => d.group === 1 ? 12 : 8)
        .attr("fill", d => d.group === 1 ? '#6366f1' : '#a78bfa');
    
    const drag = (simulation: d3.Simulation<Node, undefined>) => {
        function dragstarted(event: d3.D3DragEvent<SVGCircleElement, Node, any>, d: Node) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }
        function dragged(event: d3.D3DragEvent<SVGCircleElement, Node, any>, d: Node) {
            d.fx = event.x;
            d.fy = event.y;
        }
        function dragended(event: d3.D3DragEvent<SVGCircleElement, Node, any>, d: Node) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }
        return d3.drag<SVGCircleElement, Node>().on("start", dragstarted).on("drag", dragged).on("end", dragended);
    }

    node.call(drag(simulation));
    
    const labels = svg.append("g")
        .attr("class", "labels")
      .selectAll("text")
      .data(nodes)
      .enter().append("text")
        .text(d => d.id)
        .attr('x', 12)
        .attr('y', 4)
        .style("font-size", "12px")
        .style("fill", "#ddd");

    simulation.on("tick", () => {
      link
          .attr("x1", d => (d.source as Node).x!)
          .attr("y1", d => (d.source as Node).y!)
          .attr("x2", d => (d.target as Node).x!)
          .attr("y2", d => (d.target as Node).y!);

      node
          .attr("cx", d => d.x!)
          .attr("cy", d => d.y!);
      
      labels
          .attr("transform", d => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, [data]);

  return (
    <div ref={containerRef} className="w-full bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 animate-fade-in">
        <h3 className="text-xl font-semibold text-indigo-400 mb-4 text-center">Knowledge Graph</h3>
        <svg ref={svgRef}></svg>
    </div>
  );
};
