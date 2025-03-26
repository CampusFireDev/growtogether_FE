import { RxCross2 } from "react-icons/rx";

interface TechStackBadgeProps {
    stack: string;
    className?: string;
    showDeleteIcon?: boolean; // 삭제 아이콘 표시 여부
    onDelete?: (stack: string) => void;
}

const stackStyles: Record<string, {color: string; img: string}> = {
    "Angular": {color: "border-[#dd1b16] text-[#dd1b16]", img: "/tech_logo/angular.png"},
    "Ansible": {color: "border-[#000000] text-[#000000]", img: "/tech_logo/ansible.png"},
    "AWS": {color: "border-[#ff9900] text-[#ff9900]", img: "/tech_logo/aws.png"},
    "Bootstrap": {color: "border-[#8312fa] text-[#8312fa]", img: "/tech_logo/bootstrap.png"},
    "Docker": {color: "border-[#1D63ED] text-[#1D63ED]", img:"/tech_logo/docker.png"},
    "DigitalOcean": {color: "border-[#0080ff] text-[#0080ff]", img:"/tech_logo/digitalocean.png"},
    "Django": {color: "border-[#092e02] text-[#092e02]", img:"/tech_logo/django.png"},
    "Elasticsearch": {color: "border-[#000000] text-[#000000]", img:"/tech_logo/elasticsearch.png"},
    "Express.js": {color: "border-[#323330] text-[#323330]", img:"/tech_logo/expressjs.png"},
    "Firebase": {color: "border-[#000000] text-[#000000]", img:"/tech_logo/firebase.png"},
    "Flask": {color: "border-[#000000] text-[#000000]", img:"/tech_logo/elasticsearch.png"},
    "Google Cloud Platform": {color: "border-[#000000] text-[#000000]", img:"/tech_logo/googlecloud.png"},
    "IBM Cloud": {color: "border-[#000000] text-[#000000]", img:"/tech_logo/ibmcloud.png"},
    "Jenkins": {color: "border-[#000000] text-[#000000]", img:"/tech_logo/jenkins.png"},
    "Kubernetes": {color: "border-[#3970e4] text-[#3970e4]", img:"/tech_logo/kubernetes.png"},
    "Microsoft Azure": {color: "border-[#0078D4] text-[#0078D4]", img:"/tech_logo/microsoftazure.png"},
    "MongoDB": {color: "border-[#00684a] text-[#00684a]", img:"/tech_logo/mongodb.png"},
    "MySQL": {color: "border-[#00758F] text-[#00758F]", img:"/tech_logo/mysql.png"},
    "Next.js": {color: "border-[#000000] text-[#000000]", img:"/tech_logo/nextjs.png"},
    "Node.js": {color: "border-[#3c873a] text-[#3c873a]", img:"/tech_logo/nodejs.png"},
    "Oracle Cloud": {color: "border-[#f80000] text-[#f80000]", img:"/tech_logo/oraclecloud.png"},
    "PostgreSQL": {color: "border-[#000000] text-[#000000]", img:"/tech_logo/postgresql.png"},
    "Prometheus": {color: "border-[#FF4646] text-[#FF4646]", img:"/tech_logo/prometheus.png"},
    "React": {color: "border-[#61DAFB] text-[#61DAFB]", img: "/tech_logo/react.png"},
    "Redis": {color: "border-[#D82C20] text-[#D82C20]", img: "/tech_logo/redis.png"},
    "Ruby on Rails": {color: "border-[#cc0000] text-[#cc0000]", img: "/tech_logo/rubyonrails.png"},
    "Spring Boot": {color: "border-[#70AD51] text-[#70AD51]", img:"/tech_logo/spring.png"},
    "Svelte": {color: "border-[#000000] text-[#000000]", img: "/tech_logo/svelte.png"},
    "Terraform": {color: "border-[#7B42BC] text-[#7B42BC]", img: "/tech_logo/terraform.png"},
    "Vue.js": {color: "border-[#000000] text-[#000000]", img: "/tech_logo/vuejs.png"},
    "Javascript": {color: "border-[#FFD600] text-[#FFD600]", img:"/tech_logo/js.png"},
    "Typescript": {color: "border-[#007ACC] text-[#007ACC]", img:"/tech_logo/ts.png"},
    "Spring": {color: "border-[#34495E] text-[#34495E]", img:"/tech_logo/spring.png"},
};

const TechStackBadge = ({ stack, className, showDeleteIcon=false, onDelete }: TechStackBadgeProps) => {
    const stackData = stackStyles[stack];

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();  
        e.preventDefault();   
        onDelete?.(stack);   
    };

    return (
        <span className={`inline-flex items-center h-[30px] px-[10px] text-sm/[30px] 
            rounded-full border bg-white nexon-medium ${stackData.color} ${className} ${showDeleteIcon}`}
        >
            <img src={stackData.img} alt={`${stack} icon`} className="mr-1" />
            {stack}
            {showDeleteIcon && (
                <button className="ml-1 text-black6 hover:text-black9 cursor-pointer" onClick={handleDeleteClick}><RxCross2 /></button>
            )}
        </span>
    );
};
  

export default TechStackBadge;