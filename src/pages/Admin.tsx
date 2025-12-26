import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plane, LogOut, Loader2, Plus, Trash2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SiteContent {
  id: string;
  section_key: string;
  title: string | null;
  subtitle: string | null;
  content: string | null;
  highlights: string[] | null;
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  display_order: number;
}

interface Destination {
  id: string;
  name: string;
  flag: string;
  display_order: number;
}

interface Testimonial {
  id: string;
  name: string;
  location: string;
  content: string;
  rating: number;
  display_order: number;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  display_order: number;
}

interface ContactInfo {
  id: string;
  phone: string | null;
  email: string | null;
  address: string | null;
}

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [siteContent, setSiteContent] = useState<SiteContent[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/admin/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchAllData();
    }
  }, [user, isAdmin]);

  const fetchAllData = async () => {
    const [contentRes, servicesRes, destinationsRes, testimonialsRes, faqsRes, contactRes] = await Promise.all([
      supabase.from("site_content").select("*"),
      supabase.from("services").select("*").order("display_order"),
      supabase.from("destinations").select("*").order("display_order"),
      supabase.from("testimonials").select("*").order("display_order"),
      supabase.from("faqs").select("*").order("display_order"),
      supabase.from("contact_info").select("*").maybeSingle(),
    ]);

    if (contentRes.data) setSiteContent(contentRes.data);
    if (servicesRes.data) setServices(servicesRes.data);
    if (destinationsRes.data) setDestinations(destinationsRes.data);
    if (testimonialsRes.data) setTestimonials(testimonialsRes.data);
    if (faqsRes.data) setFaqs(faqsRes.data);
    if (contactRes.data) setContactInfo(contactRes.data);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  const updateContent = (key: string, field: keyof SiteContent, value: string | string[] | null) => {
    setSiteContent(prev => 
      prev.map(item => item.section_key === key ? { ...item, [field]: value } : item)
    );
  };

  const saveContent = async () => {
    setSaving(true);
    try {
      for (const content of siteContent) {
        await supabase.from("site_content").update({
          title: content.title,
          subtitle: content.subtitle,
          content: content.content,
          highlights: content.highlights,
        }).eq("id", content.id);
      }
      toast({ title: "Content saved successfully!" });
    } catch {
      toast({ title: "Error saving content", variant: "destructive" });
    }
    setSaving(false);
  };

  const saveServices = async () => {
    setSaving(true);
    try {
      for (const service of services) {
        await supabase.from("services").update({
          title: service.title,
          description: service.description,
          icon: service.icon,
          display_order: service.display_order,
        }).eq("id", service.id);
      }
      toast({ title: "Services saved successfully!" });
    } catch {
      toast({ title: "Error saving services", variant: "destructive" });
    }
    setSaving(false);
  };

  const addService = async () => {
    const newOrder = services.length + 1;
    const { data } = await supabase.from("services").insert({
      title: "New Service",
      description: "Service description",
      icon: "Plane",
      display_order: newOrder,
    }).select().single();
    if (data) setServices([...services, data]);
  };

  const deleteService = async (id: string) => {
    await supabase.from("services").delete().eq("id", id);
    setServices(services.filter(s => s.id !== id));
  };

  const saveDestinations = async () => {
    setSaving(true);
    try {
      for (const dest of destinations) {
        await supabase.from("destinations").update({
          name: dest.name,
          flag: dest.flag,
          display_order: dest.display_order,
        }).eq("id", dest.id);
      }
      toast({ title: "Destinations saved successfully!" });
    } catch {
      toast({ title: "Error saving destinations", variant: "destructive" });
    }
    setSaving(false);
  };

  const addDestination = async () => {
    const newOrder = destinations.length + 1;
    const { data } = await supabase.from("destinations").insert({
      name: "New Country",
      flag: "🏳️",
      display_order: newOrder,
    }).select().single();
    if (data) setDestinations([...destinations, data]);
  };

  const deleteDestination = async (id: string) => {
    await supabase.from("destinations").delete().eq("id", id);
    setDestinations(destinations.filter(d => d.id !== id));
  };

  const saveTestimonials = async () => {
    setSaving(true);
    try {
      for (const test of testimonials) {
        await supabase.from("testimonials").update({
          name: test.name,
          location: test.location,
          content: test.content,
          rating: test.rating,
          display_order: test.display_order,
        }).eq("id", test.id);
      }
      toast({ title: "Testimonials saved successfully!" });
    } catch {
      toast({ title: "Error saving testimonials", variant: "destructive" });
    }
    setSaving(false);
  };

  const addTestimonial = async () => {
    const newOrder = testimonials.length + 1;
    const { data } = await supabase.from("testimonials").insert({
      name: "New Client",
      location: "City, Country",
      content: "Testimonial content here",
      rating: 5,
      display_order: newOrder,
    }).select().single();
    if (data) setTestimonials([...testimonials, data]);
  };

  const deleteTestimonial = async (id: string) => {
    await supabase.from("testimonials").delete().eq("id", id);
    setTestimonials(testimonials.filter(t => t.id !== id));
  };

  const saveFaqs = async () => {
    setSaving(true);
    try {
      for (const faq of faqs) {
        await supabase.from("faqs").update({
          question: faq.question,
          answer: faq.answer,
          display_order: faq.display_order,
        }).eq("id", faq.id);
      }
      toast({ title: "FAQs saved successfully!" });
    } catch {
      toast({ title: "Error saving FAQs", variant: "destructive" });
    }
    setSaving(false);
  };

  const addFaq = async () => {
    const newOrder = faqs.length + 1;
    const { data } = await supabase.from("faqs").insert({
      question: "New Question?",
      answer: "Answer here",
      display_order: newOrder,
    }).select().single();
    if (data) setFaqs([...faqs, data]);
  };

  const deleteFaq = async (id: string) => {
    await supabase.from("faqs").delete().eq("id", id);
    setFaqs(faqs.filter(f => f.id !== id));
  };

  const saveContactInfo = async () => {
    setSaving(true);
    try {
      if (contactInfo) {
        await supabase.from("contact_info").update({
          phone: contactInfo.phone,
          email: contactInfo.email,
          address: contactInfo.address,
        }).eq("id", contactInfo.id);
      }
      toast({ title: "Contact info saved successfully!" });
    } catch {
      toast({ title: "Error saving contact info", variant: "destructive" });
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-destructive">Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">You don't have admin privileges.</p>
            <Button onClick={handleSignOut}>Sign Out</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const heroContent = siteContent.find(c => c.section_key === "hero");
  const aboutContent = siteContent.find(c => c.section_key === "about");

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plane className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">VisaGuide Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-sm text-muted-foreground hover:text-foreground">
              View Site
            </a>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="destinations">Destinations</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={heroContent?.title || ""}
                    onChange={(e) => updateContent("hero", "title", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Subtitle</Label>
                  <Textarea
                    value={heroContent?.subtitle || ""}
                    onChange={(e) => updateContent("hero", "subtitle", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Highlights (one per line)</Label>
                  <Textarea
                    value={heroContent?.highlights?.join("\n") || ""}
                    onChange={(e) => updateContent("hero", "highlights", e.target.value.split("\n"))}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>About Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={aboutContent?.title || ""}
                    onChange={(e) => updateContent("about", "title", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Content</Label>
                  <Textarea
                    value={aboutContent?.content || ""}
                    onChange={(e) => updateContent("about", "content", e.target.value)}
                    rows={6}
                  />
                </div>
              </CardContent>
            </Card>

            <Button onClick={saveContent} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
              Save Content
            </Button>
          </TabsContent>

          <TabsContent value="services" className="space-y-4">
            {services.map((service, index) => (
              <Card key={service.id}>
                <CardContent className="pt-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={service.title}
                        onChange={(e) => setServices(prev => prev.map((s, i) => i === index ? { ...s, title: e.target.value } : s))}
                      />
                    </div>
                    <div>
                      <Label>Icon</Label>
                      <Input
                        value={service.icon}
                        onChange={(e) => setServices(prev => prev.map((s, i) => i === index ? { ...s, icon: e.target.value } : s))}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Description</Label>
                      <Textarea
                        value={service.description}
                        onChange={(e) => setServices(prev => prev.map((s, i) => i === index ? { ...s, description: e.target.value } : s))}
                      />
                    </div>
                  </div>
                  <Button variant="destructive" size="sm" className="mt-4" onClick={() => deleteService(service.id)}>
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </Button>
                </CardContent>
              </Card>
            ))}
            <div className="flex gap-4">
              <Button onClick={addService}><Plus className="h-4 w-4 mr-2" /> Add Service</Button>
              <Button onClick={saveServices} disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                Save Services
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="destinations" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {destinations.map((dest, index) => (
                <Card key={dest.id}>
                  <CardContent className="pt-6 space-y-4">
                    <div>
                      <Label>Name</Label>
                      <Input
                        value={dest.name}
                        onChange={(e) => setDestinations(prev => prev.map((d, i) => i === index ? { ...d, name: e.target.value } : d))}
                      />
                    </div>
                    <div>
                      <Label>Flag Emoji</Label>
                      <Input
                        value={dest.flag}
                        onChange={(e) => setDestinations(prev => prev.map((d, i) => i === index ? { ...d, flag: e.target.value } : d))}
                      />
                    </div>
                    <Button variant="destructive" size="sm" onClick={() => deleteDestination(dest.id)}>
                      <Trash2 className="h-4 w-4 mr-2" /> Delete
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex gap-4">
              <Button onClick={addDestination}><Plus className="h-4 w-4 mr-2" /> Add Destination</Button>
              <Button onClick={saveDestinations} disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                Save Destinations
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="testimonials" className="space-y-4">
            {testimonials.map((test, index) => (
              <Card key={test.id}>
                <CardContent className="pt-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <Label>Name</Label>
                      <Input
                        value={test.name}
                        onChange={(e) => setTestimonials(prev => prev.map((t, i) => i === index ? { ...t, name: e.target.value } : t))}
                      />
                    </div>
                    <div>
                      <Label>Location</Label>
                      <Input
                        value={test.location}
                        onChange={(e) => setTestimonials(prev => prev.map((t, i) => i === index ? { ...t, location: e.target.value } : t))}
                      />
                    </div>
                    <div>
                      <Label>Rating</Label>
                      <Input
                        type="number"
                        min={1}
                        max={5}
                        value={test.rating}
                        onChange={(e) => setTestimonials(prev => prev.map((t, i) => i === index ? { ...t, rating: parseInt(e.target.value) } : t))}
                      />
                    </div>
                    <div className="md:col-span-3">
                      <Label>Content</Label>
                      <Textarea
                        value={test.content}
                        onChange={(e) => setTestimonials(prev => prev.map((t, i) => i === index ? { ...t, content: e.target.value } : t))}
                      />
                    </div>
                  </div>
                  <Button variant="destructive" size="sm" className="mt-4" onClick={() => deleteTestimonial(test.id)}>
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </Button>
                </CardContent>
              </Card>
            ))}
            <div className="flex gap-4">
              <Button onClick={addTestimonial}><Plus className="h-4 w-4 mr-2" /> Add Testimonial</Button>
              <Button onClick={saveTestimonials} disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                Save Testimonials
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="faqs" className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={faq.id}>
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <Label>Question</Label>
                    <Input
                      value={faq.question}
                      onChange={(e) => setFaqs(prev => prev.map((f, i) => i === index ? { ...f, question: e.target.value } : f))}
                    />
                  </div>
                  <div>
                    <Label>Answer</Label>
                    <Textarea
                      value={faq.answer}
                      onChange={(e) => setFaqs(prev => prev.map((f, i) => i === index ? { ...f, answer: e.target.value } : f))}
                      rows={3}
                    />
                  </div>
                  <Button variant="destructive" size="sm" onClick={() => deleteFaq(faq.id)}>
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </Button>
                </CardContent>
              </Card>
            ))}
            <div className="flex gap-4">
              <Button onClick={addFaq}><Plus className="h-4 w-4 mr-2" /> Add FAQ</Button>
              <Button onClick={saveFaqs} disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                Save FAQs
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Phone</Label>
                  <Input
                    value={contactInfo?.phone || ""}
                    onChange={(e) => setContactInfo(prev => prev ? { ...prev, phone: e.target.value } : null)}
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    value={contactInfo?.email || ""}
                    onChange={(e) => setContactInfo(prev => prev ? { ...prev, email: e.target.value } : null)}
                  />
                </div>
                <div>
                  <Label>Address</Label>
                  <Textarea
                    value={contactInfo?.address || ""}
                    onChange={(e) => setContactInfo(prev => prev ? { ...prev, address: e.target.value } : null)}
                  />
                </div>
                <Button onClick={saveContactInfo} disabled={saving}>
                  {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                  Save Contact Info
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
